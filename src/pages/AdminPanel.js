import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import LogoWhite from '../images/Logowhite.png';
import LeadAPI from '../services/api';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [leads, setLeads] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userRole, setUserRole] = useState('');
  const [previousLeadCount, setPreviousLeadCount] = useState(null);
  const [deletePopup, setDeletePopup] = useState({ show: false, leadId: null, password: '' });
  const [deleteError, setDeleteError] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Delete confirmation password
  const DELETE_PASSWORD = 'Welcome@2025';

  // User credentials - only admin
  const users = {
    'admin': { password: 'orchid2024', role: 'admin' }
  };

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadLeads();
      
      // Set up automatic polling every 10 seconds for real-time updates
      const pollInterval = setInterval(() => {
        loadLeads();
      }, 10000);
      
      return () => clearInterval(pollInterval);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const currentLeadCount = leads.length;
    
    if (previousLeadCount !== null && currentLeadCount > previousLeadCount) {
      // New lead added, show notification
      console.log('New lead received!');
      playNotificationSound();
    }
    
    setPreviousLeadCount(currentLeadCount);
  }, [leads.length, previousLeadCount]);

  const loadLeads = async () => {
    try {
      const fetchedLeads = await LeadAPI.getLeads();
      setLeads(fetchedLeads);
    } catch (error) {
      console.error('Error loading leads:', error);
      // Fallback to localStorage if API fails
      const localLeads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
      setLeads(localLeads);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users[loginData.username];
    if (user && user.password === loginData.password) {
      setIsLoggedIn(true);
      setUserRole(user.role);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ username: '', password: '' });
    setUserRole('');
    setActiveSection('dashboard');
  };

  const deleteLead = (index) => {
    const leadToDelete = leads[index];
    setDeletePopup({ show: true, leadId: leadToDelete.id || index, password: '' });
    setDeleteError('');
  };

  const confirmDeleteLead = async () => {
    if (deletePopup.password === DELETE_PASSWORD) {
      try {
        const leadToDelete = leads.find(lead => lead.id === deletePopup.leadId) || leads[deletePopup.leadId];
        
        if (leadToDelete && leadToDelete.id) {
          // Delete via API
          await LeadAPI.deleteLead(leadToDelete.id);
        } else {
          // Fallback for leads without ID (legacy localStorage leads)
          const updatedLeads = leads.filter((_, i) => i !== deletePopup.leadId);
          setLeads(updatedLeads);
          localStorage.setItem('websiteLeads', JSON.stringify(updatedLeads));
        }
        
        // Refresh leads from server
        await loadLeads();
        
        setDeletePopup({ show: false, leadId: null, password: '' });
        setDeleteError('');
      } catch (error) {
        console.error('Error deleting lead:', error);
        setDeleteError('Failed to delete lead. Please try again.');
      }
    } else {
      setDeleteError('Invalid password. Please try again.');
    }
  };

  const cancelDeleteLead = () => {
    setDeletePopup({ show: false, leadId: null, password: '' });
    setDeleteError('');
  };

  const exportLeads = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Phone,Subject,Message,Source,Date\n"
      + leads.map(lead => `"${lead.name}","${lead.email || 'N/A'}","${lead.phone}","${lead.subject || 'N/A'}","${lead.message || 'N/A'}","${lead.source || 'Unknown'}","${lead.date}"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  };

  const canDeleteLeads = () => userRole === 'admin';
  const canAccessLeads = () => ['admin'].includes(userRole);

  const getLeadsByMonth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const leadsByMonth = new Array(12).fill(0);
    
    leads.forEach(lead => {
      const month = new Date(lead.date).getMonth();
      leadsByMonth[month]++;
    });
    
    return months.map((month, index) => ({
      month,
      count: leadsByMonth[index]
    }));
  };

  const renderDashboard = () => (
    <div className="admin-main-content">
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Leads</h3>
            <p className="stat-number">{leads.length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Today's Leads</h3>
            <p className="stat-number">{leads.filter(lead => {
              const leadDate = new Date(lead.date);
              const today = new Date();
              return leadDate.toDateString() === today.toDateString();
            }).length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon">📞</div>
          <div className="stat-info">
            <h3>Schedule Calls</h3>
            <p className="stat-number">{leads.filter(lead => lead.source === 'Schedule Call Popup').length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon">✉️</div>
          <div className="stat-info">
            <h3>Contact Forms</h3>
            <p className="stat-number">{leads.filter(lead => lead.source === 'Contact Form').length}</p>
          </div>
        </div>
      </div>

      <div className="admin-charts-section">
        <div className="admin-chart-card">
          <h3>Leads Overview</h3>
          <div className="simple-bar-chart">
            {getLeadsByMonth().map((data, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill" 
                  style={{ height: `${Math.max(data.count * 20, 5)}px` }}
                ></div>
                <span className="bar-label">{data.month}</span>
                <span className="bar-value">{data.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-chart-card">
          <h3>Lead Sources</h3>
          <div className="source-chart">
            <div className="source-item">
              <div className="source-bar">
                <div 
                  className="source-fill schedule-call" 
                  style={{ width: `${leads.length > 0 ? (leads.filter(lead => lead.source === 'Schedule Call Popup').length / leads.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Schedule Call ({leads.filter(lead => lead.source === 'Schedule Call Popup').length})</span>
            </div>
            <div className="source-item">
              <div className="source-bar">
                <div 
                  className="source-fill contact-form" 
                  style={{ width: `${leads.length > 0 ? (leads.filter(lead => lead.source === 'Contact Form').length / leads.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Contact Form ({leads.filter(lead => lead.source === 'Contact Form').length})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => (
    <div className="admin-main-content">
      <div className="admin-leads-header">
        <h2>All Leads ({leads.length})</h2>
        <div className="admin-status-indicator">
          <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
          <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        <button onClick={loadLeads} className="admin-refresh-btn">
          🔄 Refresh
        </button>
        <button onClick={exportLeads} className="admin-export-btn">
          📥 Export CSV
        </button>
      </div>

      {leads.length === 0 ? (
        <div className="admin-no-leads">
          <div className="no-leads-icon">📋</div>
          <h3>No leads yet</h3>
          <p>Leads from your website forms will appear here</p>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Source</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead.id || index}>
                  <td>{lead.name}</td>
                  <td>{lead.email || 'N/A'}</td>
                  <td>
                    <a href={`tel:${lead.phone}`} className="admin-phone-link">
                      {lead.phone}
                    </a>
                  </td>
                  <td>{lead.subject || 'N/A'}</td>
                  <td className="message-cell" title={lead.message}>
                    {lead.message ? (lead.message.length > 50 ? lead.message.substring(0, 50) + '...' : lead.message) : 'N/A'}
                  </td>
                  <td>
                    <span className={`source-badge ${lead.source === 'Schedule Call Popup' ? 'schedule-call' : 'contact-form'}`}>
                      {lead.source || 'Unknown'}
                      {lead.offline && <span className="offline-indicator">📴</span>}
                    </span>
                  </td>
                  <td>{new Date(lead.date).toLocaleString()}</td>
                  <td>
                    {canDeleteLeads() && (
                      <button 
                        className="admin-delete-btn"
                        onClick={() => deleteLead(index)}
                      >
                        🗑️
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <div className="admin-logo">
              <h2>🏢 Orchid Admin</h2>
            </div>
            <p>Sign in to access the dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label>Username</label>
              <select
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              >
                <option value="">Select User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </div>
            
            <button type="submit" className="admin-login-btn">
              Sign In
            </button>
            
            {loginError && <div className="admin-error">{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-logo">
        <img src={LogoWhite} alt="Orchid Infrastructure Developers Logo"></img>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="admin-nav-icon">📊</span>
            Dashboard
          </button>
          
          {canAccessLeads() && (
            <button 
              className={`admin-nav-item ${activeSection === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveSection('leads')}
            >
              <span className="admin-nav-icon">👥</span>
              Leads
            </button>
          )}
          
          <button 
            className={`admin-nav-item ${activeSection === 'media' ? 'active' : ''}`}
            onClick={() => setActiveSection('media')}
          >
            <span className="admin-nav-icon">🎬</span>
            Hero Media
          </button>
          
          {canAccessLeads() && (
            <button 
              className={`admin-nav-item ${activeSection === 'content' ? 'active' : ''}`}
              onClick={() => setActiveSection('content')}
            >
              <span className="admin-nav-icon">📝</span>
              Content
            </button>
          )}
          
          {canAccessLeads() && (
            <button 
              className={`admin-nav-item ${activeSection === 'developer' ? 'active' : ''}`}
              onClick={() => setActiveSection('developer')}
            >
              <span className="admin-nav-icon">⚙️</span>
              Developer
            </button>
          )}
        </nav>
        
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <div className="admin-topbar">
          <h1>
            {activeSection === 'dashboard' ? '📊 Dashboard' : '👥 Lead Management'}
          </h1>
          <div className="admin-user-info">
            <span>Welcome, {loginData.username}</span>
          </div>
        </div>

        {activeSection === 'dashboard' ? renderDashboard() : renderLeads()}

        {deletePopup.show && (
          <div className="admin-delete-overlay">
            <div className="admin-delete-popup">
              <div className="delete-popup-header">
                <h3>🔐 Secure Delete Confirmation</h3>
                <p>This action requires administrative authorization</p>
              </div>
              
              <div className="delete-popup-content">
                <div className="delete-warning">
                  <span className="warning-icon">⚠️</span>
                  <p>You are about to permanently delete this lead. This action cannot be undone.</p>
                </div>
                
                <div className="password-input-container">
                  <label>Enter Authorization Password</label>
                  <input 
                    type="password" 
                    value={deletePopup.password} 
                    onChange={(e) => setDeletePopup({...deletePopup, password: e.target.value})}
                    placeholder="Enter password..."
                    className="delete-password-input"
                    onKeyPress={(e) => e.key === 'Enter' && confirmDeleteLead()}
                  />
                  {deleteError && <div className="delete-error-message">{deleteError}</div>}
                </div>
              </div>
              
              <div className="delete-popup-actions">
                <button onClick={confirmDeleteLead} className="delete-confirm-btn">
                  <span>🗑️</span> Confirm Delete
                </button>
                <button onClick={cancelDeleteLead} className="delete-cancel-btn">
                  <span>✕</span> Cancel
                </button>
              </div>
              
              <div className="delete-popup-footer">
                <p>For password assistance, contact <strong>Vikrant Shekhawat</strong> at <a href="mailto:developer@oidpl.com">developer@oidpl.com</a></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
