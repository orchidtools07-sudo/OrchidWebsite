// For production deployment without backend, use localStorage only
const USE_API = process.env.NODE_ENV === 'development';
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

class LeadAPI {
  constructor() {
    this.isOnline = navigator.onLine;
    this.useAPI = USE_API;
    this.setupOnlineListener();
    
    // Debug logging
    console.log('🔧 LeadAPI initialized:', {
      useAPI: this.useAPI,
      environment: process.env.NODE_ENV,
      isOnline: this.isOnline,
      apiBaseUrl: API_BASE_URL
    });
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
    console.log('📋 Getting leads...', { useAPI: this.useAPI, isOnline: this.isOnline });
    
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      console.log('💾 Using localStorage only (production mode)');
      const localLeads = this.getLocalLeads();
      console.log('📊 Retrieved leads from localStorage:', localLeads.length, 'leads');
      return localLeads;
    }

    try {
      if (!this.isOnline) {
        console.log('📴 Offline - using localStorage');
        return this.getLocalLeads();
      }

      console.log('🌐 Online - attempting API call');
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
    
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      console.log('💾 Saving lead directly to localStorage (production mode)');
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
    
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      console.log('💾 Deleting from localStorage only (production mode)');
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
