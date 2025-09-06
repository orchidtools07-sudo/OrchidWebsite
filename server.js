const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const LEADS_FILE = path.join(__dirname, 'leads.json');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://orchidinfrastructuredevelopers.netlify.app'],
  credentials: true
}));
app.use(express.json());

// Initialize leads file if it doesn't exist
async function initializeLeadsFile() {
  try {
    await fs.access(LEADS_FILE);
  } catch (error) {
    await fs.writeFile(LEADS_FILE, JSON.stringify([]));
  }
}

// Read leads from file
async function readLeads() {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

// Write leads to file
async function writeLeads(leads) {
  try {
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error('Error writing leads:', error);
    throw error;
  }
}

// Routes
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await readLeads();
    res.json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch leads' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, phone, subject, message, source } = req.body;
    
    // Validate required fields
    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name and phone are required fields' 
      });
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      email: email || '',
      phone,
      subject: subject || '',
      message: message || '',
      source: source || 'Unknown',
      date: new Date().toISOString()
    };

    const leads = await readLeads();
    leads.push(newLead);
    await writeLeads(leads);

    res.json({ success: true, lead: newLead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save lead' });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const leads = await readLeads();
    const filteredLeads = leads.filter(lead => lead.id !== id);
    
    if (leads.length === filteredLeads.length) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    await writeLeads(filteredLeads);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete lead' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// Start server
async function startServer() {
  await initializeLeadsFile();
  app.listen(PORT, () => {
    console.log(`🚀 Lead Management Server running on port ${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);
