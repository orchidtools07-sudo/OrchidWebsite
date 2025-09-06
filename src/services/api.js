import FirebaseLeadService from './firebaseLeads';

// Simple Firebase-based lead management (no server needed)
class LeadAPI {
  constructor() {
    this.isOnline = navigator.onLine;
    this.useFirebase = true; // Use Firebase for cross-device sync
    this.setupOnlineListener();
    
    console.log('🔧 LeadAPI initialized with Firebase:', {
      useFirebase: this.useFirebase,
      isOnline: this.isOnline
    });
  }

  setupOnlineListener() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('🌐 Network status: ONLINE');
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('🌐 Network status: OFFLINE');
    });
  }

  async getLeads() {
    console.log('📋 Getting leads from Firebase...');
    
    if (!this.isOnline) {
      console.log('📴 Offline - using localStorage fallback');
      return this.getLocalLeads();
    }

    try {
      const leads = await FirebaseLeadService.getLeads();
      // Cache for offline access
      localStorage.setItem('websiteLeads', JSON.stringify(leads));
      return leads;
    } catch (error) {
      console.warn('⚠️ Firebase failed, using localStorage:', error);
      return this.getLocalLeads();
    }
  }

  async submitLead(leadData) {
    console.log('📝 Submitting lead:', leadData);
    
    if (!this.isOnline) {
      console.log('📴 Offline - saving to localStorage');
      return this.saveLeadOffline(leadData);
    }

    try {
      const savedLead = await FirebaseLeadService.submitLead(leadData);
      console.log('✅ Lead saved to Firebase:', savedLead);
      return savedLead;
    } catch (error) {
      console.warn('⚠️ Firebase failed, saving offline:', error);
      return this.saveLeadOffline(leadData);
    }
  }

  async deleteLead(leadId) {
    console.log('🗑️ Deleting lead:', leadId);
    
    if (!this.isOnline) {
      console.log('📴 Offline - deleting from localStorage');
      return this.deleteLeadLocal(leadId);
    }

    try {
      await FirebaseLeadService.deleteLead(leadId);
      console.log('✅ Lead deleted from Firebase');
      return { success: true };
    } catch (error) {
      console.warn('⚠️ Firebase failed, deleting locally:', error);
      return this.deleteLeadLocal(leadId);
    }
  }

  // Fallback localStorage methods
  getLocalLeads() {
    const leads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
    console.log('📊 localStorage leads count:', leads.length);
    return leads;
  }

  saveLeadOffline(leadData) {
    const newLead = {
      id: Date.now().toString(),
      ...leadData,
      timestamp: new Date().toISOString(),
      status: 'offline'
    };
    
    const leads = this.getLocalLeads();
    leads.push(newLead);
    localStorage.setItem('websiteLeads', JSON.stringify(leads));
    
    console.log('💾 Lead saved offline:', newLead);
    return newLead;
  }

  deleteLeadLocal(leadId) {
    const leads = this.getLocalLeads();
    const filteredLeads = leads.filter(lead => lead.id !== leadId);
    localStorage.setItem('websiteLeads', JSON.stringify(filteredLeads));
    
    console.log('🗑️ Lead deleted locally:', leadId);
    return { success: true };
  }
}

export default new LeadAPI();
