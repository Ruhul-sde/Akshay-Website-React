
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [responseMessage, setResponseMessage] = useState('');
  const [adminResponse, setAdminResponse] = useState('');
  const [responseLoading, setResponseLoading] = useState(false);
  const [showEmailConfig, setShowEmailConfig] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emailConfig, setEmailConfig] = useState({
    adminEmail: '',
    emailNotifications: true,
    smtpConfig: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      user: '',
      pass: ''
    }
  });
  const [emailConfigLoading, setEmailConfigLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('supportToken');
    const userData = JSON.parse(localStorage.getItem('supportUser'));

    if (!token || !userData || userData.role !== 'admin') {
      navigate('/support');
      return;
    }

    setUser(userData);
    fetchTickets(token);
    fetchEmailConfig(token);
  }, [navigate]);

  const fetchEmailConfig = async (token) => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/admin-config`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmailConfig(data);
      }
    } catch (err) {
      console.error('Error fetching email config:', err);
    }
  };

  const fetchTickets = async (token) => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setTickets(data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    }
  };

  const handleUpdateStatus = async (ticketId, status) => {
    const token = localStorage.getItem('supportToken');

    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/${ticketId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status, assignedTo: user.name })
      });

      if (response.ok) {
        fetchTickets(token);
        const updatedTicket = await response.json();
        setSelectedTicket(updatedTicket);
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleAddResponse = async (ticketId) => {
    const token = localStorage.getItem('supportToken');

    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/${ticketId}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: responseMessage })
      });

      if (response.ok) {
        setResponseMessage('');
        fetchTickets(token);
        const updatedTicket = await response.json();
        setSelectedTicket(updatedTicket);
      }
    } catch (err) {
      alert('Error adding response');
    }
  };

  const handleAdminResponse = async () => {
    if (!adminResponse.trim()) return;
    setResponseLoading(true);
    const token = localStorage.getItem('supportToken');

    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/${selectedTicket._id}/response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: adminResponse, senderType: 'admin', sender: user.name })
      });

      if (response.ok) {
        setAdminResponse('');
        const updatedTicket = await response.json();
        setSelectedTicket(updatedTicket);
        fetchTickets(token);
      } else {
        alert('Failed to send response. Please try again.');
      }
    } catch (err) {
      console.error('Error sending response:', err);
      alert('An error occurred while sending your response.');
    } finally {
      setResponseLoading(false);
    }
  };

  const handleUpdateTicket = async (updates) => {
    const token = localStorage.getItem('supportToken');
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/${selectedTicket._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setSelectedTicket(updatedTicket);
        fetchTickets(token);
      } else {
        alert('Failed to update ticket.');
      }
    } catch (err) {
      console.error('Error updating ticket:', err);
      alert('An error occurred while updating the ticket.');
    }
  };

  const handleSaveEmailConfig = async () => {
    setEmailConfigLoading(true);
    const token = localStorage.getItem('supportToken');

    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/admin-config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(emailConfig)
      });

      if (response.ok) {
        alert('Email configuration saved successfully!');
        setShowEmailConfig(false);
      } else {
        const error = await response.json();
        alert(`Failed to save configuration: ${error.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error saving email config:', err);
      alert('An error occurred while saving the configuration.');
    } finally {
      setEmailConfigLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('supportToken');
    localStorage.removeItem('supportUser');
    navigate('/support');
  };

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-500/10 text-blue-600 border-blue-200',
      'in-progress': 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
      resolved: 'bg-green-500/10 text-green-600 border-green-200',
      closed: 'bg-gray-500/10 text-gray-600 border-gray-200'
    };
    return colors[status] || 'bg-gray-500/10 text-gray-600 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
      medium: 'bg-amber-500/10 text-amber-600 border-amber-200',
      high: 'bg-red-500/10 text-red-600 border-red-200'
    };
    return colors[priority] || 'bg-gray-500/10 text-gray-600 border-gray-200';
  };

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Modern & Creative */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-cyan-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-4 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Welcome, <span className="font-semibold text-gray-800">{user?.name || 'System Administrator'}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowEmailConfig(true)}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="relative z-10">Email Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="relative z-10">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Enhanced Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tickets', value: stats.total, icon: '📊', gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
            { label: 'Open', value: stats.open, icon: '🔵', gradient: 'from-blue-600 to-blue-500', bg: 'from-blue-50 to-blue-100' },
            { label: 'In Progress', value: stats.inProgress, icon: '⚡', gradient: 'from-yellow-500 to-amber-500', bg: 'from-yellow-50 to-amber-50' },
            { label: 'Resolved', value: stats.resolved, icon: '✅', gradient: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' }
          ].map((stat, idx) => (
            <div key={idx} className="group relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className={`relative bg-gradient-to-br ${stat.bg} backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-6 hover:shadow-xl transition-all hover:scale-105 overflow-hidden`}>
                <div className="absolute top-0 right-0 text-6xl opacity-10 transform translate-x-4 -translate-y-2">
                  {stat.icon}
                </div>
                <div className="flex items-start justify-between relative z-10">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter Section - Modern Design */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full">
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tickets by ID, customer, or subject..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All', icon: '📋' },
                { key: 'open', label: 'Open', icon: '🔵' },
                { key: 'in-progress', label: 'In Progress', icon: '⚡' },
                { key: 'resolved', label: 'Resolved', icon: '✅' },
                { key: 'closed', label: 'Closed', icon: '🔒' }
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setFilterStatus(filter.key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    filterStatus === filter.key
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  <span>{filter.icon}</span>
                  <span>{filter.label}</span>
                  {filterStatus === filter.key && (
                    <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">
                      {filter.key === 'all' ? tickets.length : tickets.filter(t => t.status === filter.key).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Table - Modern Card-Based Design */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ticket</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-500 font-medium text-lg">No tickets found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map(ticket => (
                    <tr
                      key={ticket._id}
                      onClick={() => setSelectedTicket(ticket)}
                      className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 cursor-pointer transition-all group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:animate-pulse"></div>
                          <span className="text-sm font-bold text-gray-900 font-mono">{ticket.ticketNumber}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                            {ticket.userName?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-700">{ticket.userName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 font-medium">{ticket.subject}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(ticket.priority)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(ticket.status)}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Detail Modal - Enhanced */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white p-6">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/30">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedTicket.subject}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <p className="text-sm text-white/90 font-mono bg-white/20 px-3 py-1 rounded-lg">{selectedTicket.ticketNumber}</p>
                          <span className="text-xs text-white/60">•</span>
                          <span className="text-xs text-white/80">
                            {selectedTicket.userName} ({selectedTicket.userEmail})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <select
                          value={selectedTicket.status}
                          onChange={(e) => handleUpdateTicket({ status: e.target.value })}
                          className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="open" className="text-gray-900">Open</option>
                          <option value="in-progress" className="text-gray-900">In Progress</option>
                          <option value="resolved" className="text-gray-900">Resolved</option>
                          <option value="closed" className="text-gray-900">Closed</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <select
                          value={selectedTicket.priority}
                          onChange={(e) => handleUpdateTicket({ priority: e.target.value })}
                          className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer"
                        >
                          <option value="low" className="text-gray-900">Low Priority</option>
                          <option value="medium" className="text-gray-900">Medium Priority</option>
                          <option value="high" className="text-gray-900">High Priority</option>
                        </select>
                      </div>

                      <span className="text-xs text-white/70 ml-auto">
                        Created {new Date(selectedTicket.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all ml-4"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-6">
                {/* User Info Card */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 p-3 rounded-xl">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Customer</div>
                        <div className="font-bold text-gray-900">{selectedTicket.userName}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Email</div>
                        <div className="font-medium text-gray-900 text-sm">{selectedTicket.userEmail}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Phone</div>
                        <div className="font-medium text-gray-900">{selectedTicket.phone || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-gray-500 mb-1">Company</div>
                        <div className="font-medium text-gray-900">{selectedTicket.company || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issue Description */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 mb-6 border border-red-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2">Issue Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                    </div>
                  </div>
                </div>

                {/* Conversation Thread */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <h3 className="font-bold text-lg text-gray-900">Conversation</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-semibold">
                      {selectedTicket.responses?.length || 0} messages
                    </span>
                  </div>

                  {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                    <div className="space-y-4">
                      {selectedTicket.responses.map((resp, idx) => (
                        <div key={idx} className={`flex ${resp.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] ${
                            resp.senderType === 'admin'
                              ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg'
                              : 'bg-white border-2 border-gray-200 shadow-md'
                          } rounded-2xl ${resp.senderType === 'admin' ? 'rounded-tr-sm' : 'rounded-tl-sm'} p-4`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                                resp.senderType === 'admin'
                                  ? 'bg-white/20 backdrop-blur-sm text-white border-2 border-white/30'
                                  : 'bg-gradient-to-br from-gray-400 to-gray-500 text-white'
                              }`}>
                                {resp.sender.charAt(0).toUpperCase()}
                              </div>
                              <div className="flex-1">
                                <div className={`font-semibold text-sm ${resp.senderType === 'admin' ? 'text-white' : 'text-gray-900'}`}>
                                  {resp.sender}
                                  {resp.senderType === 'admin' && (
                                    <span className="ml-2 px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
                                      ✓ Support
                                    </span>
                                  )}
                                </div>
                                <div className={`text-xs ${resp.senderType === 'admin' ? 'text-white/70' : 'text-gray-500'}`}>
                                  {new Date(resp.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <p className={`${resp.senderType === 'admin' ? 'text-white' : 'text-gray-700'} leading-relaxed`}>
                              {resp.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <p className="text-gray-600 font-medium">No responses yet</p>
                      <p className="text-gray-400 text-sm mt-1">Be the first to respond</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Response Section */}
              <div className="border-t-2 border-gray-200 bg-gradient-to-b from-white to-gray-50 p-6">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div className="flex-1 space-y-3">
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Type your response..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none text-gray-700 placeholder-gray-400 transition-all"
                      rows="3"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{adminResponse.length} characters</span>
                      <button
                        onClick={handleAdminResponse}
                        disabled={responseLoading || !adminResponse.trim()}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                      >
                        {responseLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Response
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Config Modal */}
        {showEmailConfig && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Email Notification Settings</h2>
                    <p className="text-white/80 text-sm mt-1">Configure email notifications for support tickets</p>
                  </div>
                  <button
                    onClick={() => setShowEmailConfig(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                {/* Admin Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email *</label>
                  <input
                    type="email"
                    value={emailConfig.adminEmail}
                    onChange={(e) => setEmailConfig({...emailConfig, adminEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="admin@example.com"
                  />
                </div>

                {/* Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Enable Notifications</label>
                    <p className="text-xs text-gray-500 mt-1">Receive emails for new tickets</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailConfig.emailNotifications}
                    onChange={(e) => setEmailConfig({...emailConfig, emailNotifications: e.target.checked})}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* SMTP Config */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Host *</label>
                      <input
                        type="text"
                        value={emailConfig.smtpConfig.host}
                        onChange={(e) => setEmailConfig({...emailConfig, smtpConfig: {...emailConfig.smtpConfig, host: e.target.value}})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Port *</label>
                      <input
                        type="number"
                        value={emailConfig.smtpConfig.port}
                        onChange={(e) => setEmailConfig({...emailConfig, smtpConfig: {...emailConfig.smtpConfig, port: parseInt(e.target.value)}})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="587"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                    <input
                      type="email"
                      value={emailConfig.smtpConfig.user}
                      onChange={(e) => setEmailConfig({...emailConfig, smtpConfig: {...emailConfig.smtpConfig, user: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      value={emailConfig.smtpConfig.pass}
                      onChange={(e) => setEmailConfig({...emailConfig, smtpConfig: {...emailConfig.smtpConfig, pass: e.target.value}})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="App password"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex justify-end">
                <button
                  onClick={handleSaveEmailConfig}
                  disabled={emailConfigLoading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50"
                >
                  {emailConfigLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
