import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import LogoWhite from '../images/Logowhite.png';
import LeadAPI from '../services/api';
import FirebaseLeadService from '../services/firebaseLeads';

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
    console.log('🔄 AdminPanel: Loading leads from Firebase...');
    try {
      const fetchedLeads = await FirebaseLeadService.getLeads();
      console.log('📊 AdminPanel: Received Firebase leads:', fetchedLeads.length, 'leads');
      setLeads(fetchedLeads);
      console.log('✅ AdminPanel: Firebase leads loaded successfully');
    } catch (error) {
      console.error('❌ AdminPanel: Error loading Firebase leads:', error);
      // Fallback to localStorage if Firebase fails
      const localLeads = JSON.parse(localStorage.getItem('websiteLeads') || '[]');
      console.log('💾 AdminPanel: Fallback to localStorage:', localLeads.length, 'leads');
      setLeads(localLeads);
    }
  };

  // Set up real-time listener for cross-device sync
  useEffect(() => {
    if (isLoggedIn) {
      console.log('👂 Setting up real-time Firebase listener...');
      const unsubscribe = FirebaseLeadService.onLeadsChange((updatedLeads) => {
        console.log('🔄 Real-time update received:', updatedLeads.length, 'leads');
        setLeads(updatedLeads);
        
        // Play notification sound for new leads
        if (updatedLeads.length > leads.length) {
          playNotificationSound();
        }
      });

      // Cleanup listener on unmount
      return () => {
        console.log('🔌 Cleaning up Firebase listener');
        unsubscribe();
      };
    }
  }, [isLoggedIn, leads.length]);

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
      + "Name,Email,Phone,Subject,Message,Status,Date\n"
      + leads.map(lead => `"${lead.name}","${lead.email || 'N/A'}","${lead.phone}","${lead.subject || 'N/A'}","${lead.message || 'N/A'}","${lead.status || 'unread'}","${new Date(lead.timestamp || lead.date).toLocaleString()}"`).join("\n");
    
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
      const timestamp = lead.timestamp || lead.date;
      if (timestamp) {
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          const month = date.getMonth();
          leadsByMonth[month]++;
        }
      }
    });
    
    return months.map((month, index) => ({
      month,
      count: leadsByMonth[index]
    }));
  };

  const toggleLeadStatus = (leadId, currentStatus) => {
    const updatedLeads = leads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: currentStatus === 'read' ? 'unread' : 'read' };
      }
      return lead;
    });
    setLeads(updatedLeads);
  };

  const markAllAsRead = () => {
    const updatedLeads = leads.map(lead => ({ ...lead, status: 'read' }));
    setLeads(updatedLeads);
  };

  const renderDashboard = () => (
    <div className="admin-main-content">
      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button 
            className="quick-action-btn export-btn"
            onClick={exportLeads}
          >
            📊 Export Leads
          </button>
          <button 
            className="quick-action-btn mark-all-read-btn"
            onClick={markAllAsRead}
          >
            ✅ Mark All Read
          </button>
          <button 
            className="quick-action-btn view-leads-btn"
            onClick={() => setActiveSection('leads')}
          >
            👥 View All Leads
          </button>
          <button 
            className="quick-action-btn refresh-btn"
            onClick={() => loadLeads()}
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>

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
              const leadDate = new Date(lead.timestamp || lead.date);
              const today = new Date();
              return leadDate.toDateString() === today.toDateString();
            }).length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon">�</div>
          <div className="stat-info">
            <h3>Unread Leads</h3>
            <p className="stat-number">{leads.filter(lead => (lead.status || 'unread') === 'unread').length}</p>
          </div>
        </div>
        
        <div className="admin-stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Read Leads</h3>
            <p className="stat-number">{leads.filter(lead => lead.status === 'read').length}</p>
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
                  style={{ height: `${data.count > 0 ? (data.count / Math.max(...getLeadsByMonth().map(d => d.count))) * 100 : 0}%` }}
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
                  style={{ width: `${leads.length > 0 ? (leads.filter(lead => lead.leadType === 'Schedule Call Popup').length / leads.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Schedule Call ({leads.filter(lead => lead.leadType === 'Schedule Call Popup').length})</span>
            </div>
            <div className="source-item">
              <div className="source-bar">
                <div 
                  className="source-fill contact-form" 
                  style={{ width: `${leads.length > 0 ? (leads.filter(lead => lead.leadType === 'Contact Form').length / leads.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span>Contact Form ({leads.filter(lead => lead.leadType === 'Contact Form').length})</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="admin-chart-card recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-feed">
            {leads.slice(0, 5).map((lead, index) => (
              <div key={lead.id || index} className="activity-item">
                <div className="activity-icon">
                  {lead.leadType === 'Schedule Call Popup' ? '📞' : '📧'}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{lead.name} submitted a {lead.leadType}</p>
                  <p className="activity-time">
                    {(() => {
                      const timestamp = lead.timestamp || lead.date;
                      if (!timestamp) return 'Unknown time';
                      
                      const date = new Date(timestamp);
                      if (isNaN(date.getTime())) {
                        // If timestamp is invalid, try to parse it differently or show fallback
                        return 'Invalid date format';
                      }
                      
                      return date.toLocaleString();
                    })()}
                  </p>
                </div>
                <div className={`activity-status ${lead.status === 'read' ? 'read' : 'unread'}`}>
                  {lead.status === 'read' ? '✅' : '📧'}
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="no-activity">
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Lead Insights */}
        <div className="admin-chart-card lead-insights">
          <h3>Lead Insights</h3>
          <div className="insights-grid">
            <div className="insight-item">
              <div className="insight-value">
                {leads.length > 0 ? Math.round((leads.filter(lead => lead.status === 'read').length / leads.length) * 100) : 0}%
              </div>
              <div className="insight-label">Response Rate</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">
                {leads.filter(lead => {
                  const timestamp = lead.timestamp || lead.date;
                  if (!timestamp) return false;
                  const date = new Date(timestamp);
                  const today = new Date();
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);
                  return date.toDateString() === yesterday.toDateString();
                }).length}
              </div>
              <div className="insight-label">Yesterday's Leads</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">
                {leads.filter(lead => {
                  const timestamp = lead.timestamp || lead.date;
                  if (!timestamp) return false;
                  const date = new Date(timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return date >= weekAgo;
                }).length}
              </div>
              <div className="insight-label">This Week</div>
            </div>
            <div className="insight-item">
              <div className="insight-value">
                {leads.filter(lead => lead.phone && lead.phone.length > 0).length}
              </div>
              <div className="insight-label">With Phone</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeads = () => {
    console.log('🎨 AdminPanel: Rendering leads component, current leads count:', leads.length);
    
    return (
      <div className="admin-main-content">
        <div className="admin-leads-header">
          <h2>All Leads ({leads.length})</h2>
          <div className="admin-status-indicator">
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
            <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
          </div>
          <button onClick={() => {
            console.log('🔄 AdminPanel: Manual refresh triggered');
            loadLeads();
          }} className="admin-refresh-btn">
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
            <button onClick={() => {
              console.log('🔍 AdminPanel: Debug button clicked - checking localStorage');
              const localData = localStorage.getItem('websiteLeads');
              console.log('📊 Raw localStorage data:', localData);
              if (localData) {
                const parsed = JSON.parse(localData);
                console.log('📋 Parsed localStorage leads:', parsed);
              }
            }} style={{
              background: '#2B5786',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              🔍 Debug localStorage
            </button>
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
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => {
                  console.log('📋 AdminPanel: Rendering lead row:', index, lead);
                  return (
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
                        <span 
                          className={`status-badge ${lead.status === 'read' ? 'read' : 'unread'}`}
                          onClick={() => toggleLeadStatus(lead.id, lead.status)}
                          style={{ cursor: 'pointer' }}
                        >
                          {lead.status === 'read' ? '✅ Read' : '📧 Unread'}
                          {lead.offline && <span className="offline-indicator">📴</span>}
                        </span>
                      </td>
                      <td>
                        {(() => {
                          const timestamp = lead.timestamp || lead.date;
                          if (!timestamp) return 'No date';
                          
                          const date = new Date(timestamp);
                          if (isNaN(date.getTime())) {
                            // If timestamp is invalid, try to parse it differently or show fallback
                            return 'Invalid date format';
                          }
                          
                          return date.toLocaleString();
                        })()}
                      </td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

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
      {/* Top Navigation Bar */}
      <div className="admin-topbar">
        <div className="admin-topbar-content">
          <div className="admin-logo">
            <img src={LogoWhite} alt="Orchid Infrastructure Developers Logo" />
          </div>
          
          <nav className="admin-tabs">
            <button 
              className={`admin-tab ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <span className="admin-tab-icon">📊</span>
              Dashboard
            </button>
            
            {canAccessLeads() && (
              <button 
                className={`admin-tab ${activeSection === 'leads' ? 'active' : ''}`}
                onClick={() => setActiveSection('leads')}
              >
                <span className="admin-tab-icon">👥</span>
                Leads
              </button>
            )}
          </nav>
          
          <div className="admin-topbar-actions">
            <div className="admin-notifications">
              <button className="notification-btn" onClick={() => setActiveSection('leads')}>
                <span className="notification-icon">🔔</span>
                {leads.filter(lead => (lead.status || 'unread') === 'unread').length > 0 && (
                  <span className="notification-badge">
                    {leads.filter(lead => (lead.status || 'unread') === 'unread').length}
                  </span>
                )}
              </button>
            </div>
            <div className="admin-status">
              {isOnline ? (
                <span className="status-online">🟢 Online</span>
              ) : (
                <span className="status-offline">🔴 Offline</span>
              )}
            </div>
            <button 
              className="admin-logout-btn"
              onClick={() => setIsLoggedIn(false)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main">
        {activeSection === 'dashboard' && renderDashboard()}
        {activeSection === 'leads' && renderLeads()}
      </div>
    </div>
  );
};

export default AdminPanel;
