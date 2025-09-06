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
  }

  setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      if (this.useAPI) {
        this.syncOfflineLeads();
      }
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async makeRequest(url, options = {}) {
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

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getLeads() {
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      return this.getLocalLeads();
    }

    try {
      if (!this.isOnline) {
        return this.getLocalLeads();
      }

      const response = await this.makeRequest('/leads');
      if (response.success) {
        // Cache leads locally for offline access
        localStorage.setItem('websiteLeads', JSON.stringify(response.leads));
        return response.leads;
      }
      throw new Error(response.error || 'Failed to fetch leads');
    } catch (error) {
      console.warn('API fetch failed, using local storage:', error);
      return this.getLocalLeads();
    }
  }

  async submitLead(leadData) {
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      return this.saveLeadDirectly(leadData);
    }

    try {
      if (!this.isOnline) {
        return this.saveLeadOffline(leadData);
      }

      const response = await this.makeRequest('/leads', {
        method: 'POST',
        body: JSON.stringify(leadData),
      });

      if (response.success) {
        // Update local cache
        const localLeads = this.getLocalLeads();
        localLeads.push(response.lead);
        localStorage.setItem('websiteLeads', JSON.stringify(localLeads));
        return response.lead;
      }
      throw new Error(response.error || 'Failed to submit lead');
    } catch (error) {
      console.warn('API submit failed, saving offline:', error);
      return this.saveLeadOffline(leadData);
    }
  }

  async deleteLead(leadId) {
    // In production without backend, use localStorage only
    if (!this.useAPI) {
      return this.deleteLeadLocal(leadId);
    }

    try {
      if (!this.isOnline) {
        return this.deleteLeadLocal(leadId);
      }

      const response = await this.makeRequest(`/leads/${leadId}`, {
        method: 'DELETE',
      });

      if (response.success) {
        // Update local cache
        const localLeads = this.getLocalLeads();
        const updatedLeads = localLeads.filter(lead => lead.id !== leadId);
        localStorage.setItem('websiteLeads', JSON.stringify(updatedLeads));
        return true;
      }
      throw new Error(response.error || 'Failed to delete lead');
    } catch (error) {
      console.warn('API delete failed, deleting locally:', error);
      return this.deleteLeadLocal(leadId);
    }
  }

  getLocalLeads() {
    try {
      return JSON.parse(localStorage.getItem('websiteLeads') || '[]');
    } catch (error) {
      console.error('Error reading local leads:', error);
      return [];
    }
  }

  saveLeadDirectly(leadData) {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      date: new Date().toISOString(),
    };

    const localLeads = this.getLocalLeads();
    localLeads.push(newLead);
    localStorage.setItem('websiteLeads', JSON.stringify(localLeads));

    // Trigger storage event for cross-tab communication
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'websiteLeads',
      newValue: JSON.stringify(localLeads),
      oldValue: JSON.stringify(localLeads.slice(0, -1))
    }));

    return newLead;
  }

  saveLeadOffline(leadData) {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      date: new Date().toISOString(),
      offline: true, // Mark as offline submission
    };

    const localLeads = this.getLocalLeads();
    localLeads.push(newLead);
    localStorage.setItem('websiteLeads', JSON.stringify(localLeads));

    // Store for later sync only if using API
    if (this.useAPI) {
      const offlineLeads = JSON.parse(localStorage.getItem('offlineLeads') || '[]');
      offlineLeads.push(newLead);
      localStorage.setItem('offlineLeads', JSON.stringify(offlineLeads));
    }

    return newLead;
  }

  deleteLeadLocal(leadId) {
    const localLeads = this.getLocalLeads();
    const updatedLeads = localLeads.filter(lead => lead.id !== leadId);
    localStorage.setItem('websiteLeads', JSON.stringify(updatedLeads));
    return true;
  }

  async syncOfflineLeads() {
    // Only sync if using API
    if (!this.useAPI) return;

    try {
      const offlineLeads = JSON.parse(localStorage.getItem('offlineLeads') || '[]');
      if (offlineLeads.length === 0) return;

      console.log(`Syncing ${offlineLeads.length} offline leads...`);

      for (const lead of offlineLeads) {
        try {
          const { offline, ...leadData } = lead; // Remove offline flag
          await this.makeRequest('/leads', {
            method: 'POST',
            body: JSON.stringify(leadData),
          });
        } catch (error) {
          console.error('Failed to sync lead:', lead, error);
        }
      }

      // Clear offline leads after successful sync
      localStorage.removeItem('offlineLeads');
      console.log('Offline leads synced successfully');

      // Refresh leads from server
      await this.getLeads();
    } catch (error) {
      console.error('Error syncing offline leads:', error);
    }
  }

  async checkServerHealth() {
    if (!this.useAPI) return false;
    
    try {
      const response = await this.makeRequest('/health');
      return response.success;
    } catch (error) {
      return false;
    }
  }
}

// Create instance and export as default
const leadAPIInstance = new LeadAPI();
export default leadAPIInstance;
