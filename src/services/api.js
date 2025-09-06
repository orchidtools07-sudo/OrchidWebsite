// For production deployment without backend, use localStorage only
// In development, check if server is actually running
const USE_API = process.env.NODE_ENV === 'development';
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

class LeadAPI {
  constructor() {
    this.isOnline = navigator.onLine;
    this.useAPI = USE_API;
    this.serverAvailable = false;
    this.serverChecked = false;
    this.migrationCompleted = localStorage.getItem('leadsMigrated') === 'true';
    this.setupOnlineListener();
    
    // Check server availability on initialization
    if (this.useAPI) {
      this.initializeWithServer();
    }
    
    // Debug logging
    console.log('🔧 LeadAPI initialized:', {
      useAPI: this.useAPI,
      environment: process.env.NODE_ENV,
      isOnline: this.isOnline,
      apiBaseUrl: API_BASE_URL,
      migrationCompleted: this.migrationCompleted
    });
  }

  async initializeWithServer() {
    await this.checkServerAvailability();
    
    // If server is available and migration not completed, migrate localStorage data
    if (this.serverAvailable && !this.migrationCompleted) {
      await this.migrateLocalStorageToServer();
    }
  }

  async migrateLocalStorageToServer() {
    try {
      console.log('🔄 Starting localStorage to server migration...');
      const localLeads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
      
      if (localLeads.length === 0) {
        console.log('📭 No local leads to migrate');
        localStorage.setItem('leadsMigrated', 'true');
        this.migrationCompleted = true;
        return;
      }

      console.log(`📦 Found ${localLeads.length} local leads to migrate`);
      
      // Get existing server leads to avoid duplicates
      const serverResponse = await this.makeRequest('/leads');
      const serverLeads = serverResponse.success ? serverResponse.leads : [];
      const serverEmails = new Set(serverLeads.map(lead => lead.email));
      
      // Filter out leads that already exist on server
      const leadsToMigrate = localLeads.filter(lead => !serverEmails.has(lead.email));
      
      if (leadsToMigrate.length === 0) {
        console.log('✅ All local leads already exist on server');
        localStorage.setItem('leadsMigrated', 'true');
        this.migrationCompleted = true;
        return;
      }

      console.log(`🚀 Migrating ${leadsToMigrate.length} unique leads to server...`);
      
      // Migrate each lead
      let migratedCount = 0;
      for (const lead of leadsToMigrate) {
        try {
          const response = await this.makeRequest('/leads', {
            method: 'POST',
            body: JSON.stringify({
              name: lead.name,
              email: lead.email,
              phone: lead.phone,
              subject: lead.subject || 'Migrated Lead',
              message: lead.message || ''
            })
          });
          
          if (response.success) {
            migratedCount++;
            console.log(`✅ Migrated lead: ${lead.name} (${lead.email})`);
          }
        } catch (error) {
          console.error(`❌ Failed to migrate lead ${lead.name}:`, error);
        }
      }
      
      console.log(`🎉 Migration completed: ${migratedCount}/${leadsToMigrate.length} leads migrated`);
      localStorage.setItem('leadsMigrated', 'true');
      this.migrationCompleted = true;
      
      // Clear localStorage after successful migration
      if (migratedCount > 0) {
        localStorage.removeItem('websiteLeads');
        console.log('🧹 Cleared localStorage after successful migration');
      }
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
    }
  }

  async checkServerAvailability() {
    if (this.serverChecked) return this.serverAvailable;
    
    try {
      console.log('🏥 Checking server availability...');
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      
      if (response.ok) {
        const data = await response.json();
        this.serverAvailable = data.success || false;
        console.log('✅ Server is available:', this.serverAvailable);
      } else {
        this.serverAvailable = false;
        console.log('❌ Server responded with error:', response.status);
      }
    } catch (error) {
      this.serverAvailable = false;
      console.log('❌ Server is not available:', error.message);
    }
    
    this.serverChecked = true;
    
    // If server is not available in development, disable API usage
    if (!this.serverAvailable && this.useAPI) {
      console.log('💾 Server unavailable - switching to localStorage mode');
      this.useAPI = false;
    }
    
    return this.serverAvailable;
  }

  setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('🌐 Network status: ONLINE');
      if (this.useAPI) {
        this.syncOfflineLeads();
      }
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('🌐 Network status: OFFLINE');
    });
  }

  async makeRequest(url, options = {}) {
    console.log('📡 Making API request:', { url: `${API_BASE_URL}${url}`, method: options.method || 'GET' });
    
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API request successful:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  async getLeads() {
    console.log('📋 Getting leads...', { useAPI: this.useAPI, isOnline: this.isOnline, serverAvailable: this.serverAvailable });
    
    // Check server availability first if using API
    if (this.useAPI) {
      await this.checkServerAvailability();
    }
    
    // In production without backend, or if server unavailable, use localStorage only
    if (!this.useAPI || !this.serverAvailable) {
      console.log('💾 Using localStorage only');
      const localLeads = this.getLocalLeads();
      console.log('📊 Retrieved leads from localStorage:', localLeads.length, 'leads');
      return localLeads;
    }

    try {
      if (!this.isOnline) {
        console.log('📴 Offline - using localStorage');
        return this.getLocalLeads();
      }

      console.log('🌐 Online - fetching from API');
      const response = await this.makeRequest('/leads');
      if (response.success) {
        // Cache leads locally for offline access
        localStorage.setItem('websiteLeads', JSON.stringify(response.leads));
        console.log('✅ Leads fetched from API and cached:', response.leads.length, 'leads');
        return response.leads;
      }
      throw new Error(response.error || 'Failed to fetch leads');
    } catch (error) {
      console.warn('⚠️ API fetch failed, using local storage:', error);
      const localLeads = this.getLocalLeads();
      console.log('📊 Fallback to localStorage:', localLeads.length, 'leads');
      return localLeads;
    }
  }

  async submitLead(leadData) {
    console.log('📝 Submitting lead:', leadData);
    
    // Check server availability first if using API
    if (this.useAPI) {
      await this.checkServerAvailability();
    }
    
    // In production without backend, or if server unavailable, use localStorage only
    if (!this.useAPI || !this.serverAvailable) {
      console.log('💾 Saving lead directly to localStorage');
      const savedLead = this.saveLeadDirectly(leadData);
      console.log('✅ Lead saved successfully:', savedLead);
      return savedLead;
    }

    try {
      if (!this.isOnline) {
        console.log('📴 Offline - saving lead offline');
        return this.saveLeadOffline(leadData);
      }

      console.log('🌐 Online - submitting to API');
      const response = await this.makeRequest('/leads', {
        method: 'POST',
        body: JSON.stringify(leadData),
      });

      if (response.success) {
        // Update local cache
        const localLeads = this.getLocalLeads();
        localLeads.push(response.lead);
        localStorage.setItem('websiteLeads', JSON.stringify(localLeads));
        console.log('✅ Lead submitted to API and cached:', response.lead);
        return response.lead;
      }
      throw new Error(response.error || 'Failed to submit lead');
    } catch (error) {
      console.warn('⚠️ API submit failed, saving offline:', error);
      const savedLead = this.saveLeadOffline(leadData);
      console.log('💾 Lead saved offline:', savedLead);
      return savedLead;
    }
  }

  async deleteLead(leadId) {
    console.log('🗑️ Deleting lead:', leadId);
    
    // Check server availability first if using API
    if (this.useAPI) {
      await this.checkServerAvailability();
    }
    
    // In production without backend, or if server unavailable, use localStorage only
    if (!this.useAPI || !this.serverAvailable) {
      console.log('💾 Deleting from localStorage only');
      const result = this.deleteLeadLocal(leadId);
      console.log('✅ Lead deleted from localStorage:', result);
      return result;
    }

    try {
      if (!this.isOnline) {
        console.log('📴 Offline - deleting locally');
        return this.deleteLeadLocal(leadId);
      }

      console.log('🌐 Online - deleting via API');
      const response = await this.makeRequest(`/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.success) {
        // Update local cache
        const localLeads = this.getLocalLeads();
        const updatedLeads = localLeads.filter(lead => lead.id !== leadId);
        localStorage.setItem('websiteLeads', JSON.stringify(updatedLeads));
        console.log('✅ Lead deleted from API and cache');
        return true;
      }
      throw new Error(response.error || 'Failed to delete lead');
    } catch (error) {
      console.warn('⚠️ API delete failed, deleting locally:', error);
      const result = this.deleteLeadLocal(leadId);
      console.log('💾 Lead deleted locally:', result);
      return result;
    }
  }

  getLocalLeads() {
    try {
      const leads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
      console.log('📊 localStorage leads count:', leads.length);
      if (leads.length > 0) {
        console.log('📋 Sample lead:', leads[0]);
      }
      return leads;
    } catch (error) {
      console.error('❌ Error reading local leads:', error);
      return [];
    }
  }

  saveLeadDirectly(leadData) {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      date: new Date().toISOString(),
    };

    console.log('💾 Saving lead directly:', newLead);

    const localLeads = this.getLocalLeads();
    localLeads.push(newLead);
    localStorage.setItem('websiteLeads', JSON.stringify(localLeads));

    console.log('📊 Total leads after save:', localLeads.length);

    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'websiteLeads',
      newValue: JSON.stringify(localLeads),
      oldValue: JSON.stringify(localLeads.slice(0, -1))
    }));

    console.log('📡 Storage event dispatched');
    return newLead;
  }

  saveLeadOffline(leadData) {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      date: new Date().toISOString(),
      offline: true, // Mark as offline submission
    };

    console.log('💾 Saving lead offline:', newLead);

    const localLeads = this.getLocalLeads();
    localLeads.push(newLead);
    localStorage.setItem('websiteLeads', JSON.stringify(localLeads));

    console.log('📊 Total leads after save:', localLeads.length);

    // Store for later sync only if using API
    if (this.useAPI) {
      const offlineLeads = JSON.parse(localStorage.getItem('offlineLeads') || '[]');
      offlineLeads.push(newLead);
      localStorage.setItem('offlineLeads', JSON.stringify(offlineLeads));
      console.log('📊 Offline leads stored:', offlineLeads.length);
    }

    return newLead;
  }

  deleteLeadLocal(leadId) {
    const localLeads = this.getLocalLeads();
    const updatedLeads = localLeads.filter(lead => lead.id !== leadId);
    localStorage.setItem('websiteLeads', JSON.stringify(updatedLeads));
    console.log('📊 Total leads after delete:', updatedLeads.length);
    return true;
  }

  async syncOfflineLeads() {
    // Only sync if using API
    if (!this.useAPI) return;

    try {
      const offlineLeads = JSON.parse(localStorage.getItem('offlineLeads') || '[]');
      if (offlineLeads.length === 0) return;

      console.log(`📡 Syncing ${offlineLeads.length} offline leads...`);

      for (const lead of offlineLeads) {
        try {
          const { offline, ...leadData } = lead; // Remove offline flag
          await this.makeRequest('/leads', {
            method: 'POST',
            body: JSON.stringify(leadData),
          });
          console.log('✅ Lead synced:', leadData);
        } catch (error) {
          console.error('❌ Failed to sync lead:', lead, error);
        }
      }

      // Clear offline leads after successful sync
      localStorage.removeItem('offlineLeads');
      console.log('📊 Offline leads synced successfully');

      // Refresh leads from server
      await this.getLeads();
    } catch (error) {
      console.error('❌ Error syncing offline leads:', error);
    }
  }

  async checkServerHealth() {
    if (!this.useAPI) return false;
    
    try {
      const response = await this.makeRequest('/health');
      console.log('🏥 Server health:', response.success);
      return response.success;
    } catch (error) {
      console.error('❌ Error checking server health:', error);
      return false;
    }
  }
}

// Create instance and export as default
const leadAPIInstance = new LeadAPI();
export default leadAPIInstance;
