const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Data storage file
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Initialize leads file if it doesn't exist
async function initializeLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch (error) {
    // File doesn't exist, create it
    await fs.writeFile(LEADS_FILE, JSON.stringify([]));
    console.log(' Created leads.json file');
  }
}

// Helper functions for lead management
async function readLeads() {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

async function writeLeads(leads) {
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing leads:', error);
    return false;
  }
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// Get all leads
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await readLeads();
    console.log(` Retrieved ${leads.length} leads`);
    res.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch leads' });
  }
});

// Submit a new lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and phone are required' 
      });
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject: subject || 'No subject',
      message: message || '',
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    const leads = await readLeads();
    leads.push(newLead);
    
    const success = await writeLeads(leads);
    if (success) {
      console.log(` New lead saved: ${name} (${email})`);
      res.json({ success: true, lead: newLead });
    } else {
      throw new Error('Failed to save lead');
    }
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, error: 'Failed to save lead' });
  }
});

// Delete a lead
app.delete('/api/leads/:id', async (req, res) => {
  try {
    const leadId = req.params.id;
    const leads = await readLeads();
    
    const initialLength = leads.length;
    const filteredLeads = leads.filter(lead => lead.id !== leadId);
    
    if (filteredLeads.length === initialLength) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    const success = await writeLeads(filteredLeads);
    if (success) {
      console.log(` Lead deleted: ${leadId}`);
      res.json({ success: true, message: 'Lead deleted successfully' });
    } else {
      throw new Error('Failed to delete lead');
    }
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ success: false, error: 'Failed to delete lead' });
  }
});

// Update lead status
app.patch('/api/leads/:id', async (req, res) => {
  try {
    const leadId = req.params.id;
    const { status } = req.body;
    
    const leads = await readLeads();
    const leadIndex = leads.findIndex(lead => lead.id === leadId);
    
    if (leadIndex === -1) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    leads[leadIndex].status = status;
    leads[leadIndex].updatedAt = new Date().toISOString();

    const success = await writeLeads(leads);
    if (success) {
      console.log(` Lead updated: ${leadId} -> ${status}`);
      res.json({ success: true, lead: leads[leadIndex] });
    } else {
      throw new Error('Failed to update lead');
    }
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ success: false, error: 'Failed to update lead' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server
async function startServer() {
  try {
    await initializeLeadsFile();
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` API endpoints available:`);
      console.log(`   GET  /api/health - Health check`);
      console.log(`   GET  /api/leads - Get all leads`);
      console.log(`   POST /api/leads - Submit new lead`);
      console.log(`   DELETE /api/leads/:id - Delete lead`);
      console.log(`   PATCH /api/leads/:id - Update lead status`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
