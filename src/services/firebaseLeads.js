import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  onSnapshot,
  orderBy,
  query,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebaseConfig';

class FirebaseLeadService {
  constructor() {
    this.collectionName = 'leads';
    this.leadsCollection = collection(db, this.collectionName);
    console.log('🔥 Firebase Lead Service initialized');
  }

  // Submit a new lead
  async submitLead(leadData) {
    try {
      console.log('📝 Submitting lead to Firebase:', leadData);
      
      const docRef = await addDoc(this.leadsCollection, {
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        subject: leadData.subject || 'No subject',
        message: leadData.message || '',
        timestamp: serverTimestamp(),
        status: 'new'
      });

      console.log('✅ Lead submitted to Firebase:', docRef.id);
      return { id: docRef.id, ...leadData };
    } catch (error) {
      console.error('❌ Error submitting lead to Firebase:', error);
      throw error;
    }
  }

  // Get all leads
  async getLeads() {
    try {
      console.log('📋 Fetching leads from Firebase...');
      
      const q = query(this.leadsCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const leads = [];
      querySnapshot.forEach((doc) => {
        leads.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
        });
      });

      console.log('✅ Fetched leads from Firebase:', leads.length, 'leads');
      return leads;
    } catch (error) {
      console.error('❌ Error fetching leads from Firebase:', error);
      throw error;
    }
  }

  // Delete a lead
  async deleteLead(leadId) {
    try {
      console.log('🗑️ Deleting lead from Firebase:', leadId);
      
      await deleteDoc(doc(db, this.collectionName, leadId));
      
      console.log('✅ Lead deleted from Firebase:', leadId);
      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting lead from Firebase:', error);
      throw error;
    }
  }

  // Real-time listener for leads (optional)
  onLeadsChange(callback) {
    console.log('👂 Setting up real-time listener for leads');
    
    const q = query(this.leadsCollection, orderBy('timestamp', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const leads = [];
      querySnapshot.forEach((doc) => {
        leads.push({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.()?.toISOString() || new Date().toISOString()
        });
      });
      
      console.log('🔄 Real-time update: leads changed', leads.length);
      callback(leads);
    });
  }
}

const firebaseLeadService = new FirebaseLeadService();
export default firebaseLeadService;
