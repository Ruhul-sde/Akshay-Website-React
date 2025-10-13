
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    category: 'technical',
    priority: 'medium'
  });
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('supportToken');
    const userData = JSON.parse(localStorage.getItem('supportUser'));
    
    if (!token || !userData) {
      navigate('/support');
      return;
    }
    
    setUser(userData);
    fetchTickets(token);
  }, [navigate]);

  const fetchTickets = async (token) => {
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/user`, {
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

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('supportToken');
    
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/tickets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newTicket)
      });

      if (response.ok) {
        setShowCreateTicket(false);
        setNewTicket({ subject: '', description: '', category: 'technical', priority: 'medium' });
        fetchTickets(token);
      }
    } catch (err) {
      alert('Error creating ticket');
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

  const handleLogout = () => {
    localStorage.removeItem('supportToken');
    localStorage.removeItem('supportUser');
    navigate('/support');
  };

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your support tickets</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCreateTicket(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                + New Ticket
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <div
              key={ticket._id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{ticket.subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">{ticket.ticketNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{ticket.description}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Ticket Modal */}
        {showCreateTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Create New Ticket</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    rows="5"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="technical">Technical</option>
                      <option value="billing">Billing</option>
                      <option value="general">General</option>
                      <option value="feature-request">Feature Request</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg"
                  >
                    Create Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateTicket(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTicket.subject}</h2>
                  <p className="text-gray-500 mt-1">{selectedTicket.ticketNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{selectedTicket.description}</p>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg">Responses</h3>
                {selectedTicket.responses?.map((resp, idx) => (
                  <div key={idx} className={`p-4 rounded-lg ${resp.senderType === 'admin' ? 'bg-purple-50' : 'bg-gray-50'}`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">{resp.sender}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(resp.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{resp.message}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Add a response..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
                <button
                  onClick={() => handleAddResponse(selectedTicket._id)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
