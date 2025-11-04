
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('user');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', company: '', phone: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('supportToken');
    if (token) {
      const user = JSON.parse(localStorage.getItem('supportUser'));
      if (user?.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === 'admin' ? '/auth/admin/login' : '/auth/login';
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('supportToken', data.token);
        localStorage.setItem('supportUser', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3001' : '';
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('supportToken', data.token);
        localStorage.setItem('supportUser', JSON.stringify(data.user));
        navigate('/user-dashboard');
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
              Support Portal
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Access your dashboard to manage support tickets, track issues, and get expert assistance
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-5">
              {/* Left Side - Info Panel */}
              <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-10 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-6">Welcome Back</h2>
                  <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                    Get instant access to our comprehensive support system with real-time ticket tracking and expert assistance.
                  </p>
                  
                  <div className="space-y-5">
                    {[
                      { icon: '⚡', title: 'Instant Support', desc: 'Get help in real-time' },
                      { icon: '📊', title: 'Track Progress', desc: 'Monitor ticket status' },
                      { icon: '🎯', title: 'Expert Team', desc: '24/7 assistance' },
                      { icon: '🔒', title: 'Secure Portal', desc: 'Protected access' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{item.title}</div>
                          <div className="text-purple-100 text-sm">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-10 border-t border-white/20">
                    <div className="text-sm text-purple-100">Need help?</div>
                    <div className="text-lg font-semibold">support@akshaysoft.com</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Auth Forms */}
              <div className="lg:col-span-3 p-10">
                {/* User Type Toggle */}
                <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-8">
                  <button
                    onClick={() => setUserType('user')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      userType === 'user' 
                        ? 'bg-white text-purple-600 shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Customer Portal
                    </div>
                  </button>
                  <button
                    onClick={() => setUserType('admin')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      userType === 'admin' 
                        ? 'bg-white text-purple-600 shadow-md' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Admin Access
                    </div>
                  </button>
                </div>

                {/* Tab Toggle for Customer */}
                {userType === 'user' && (
                  <div className="flex gap-6 mb-8 border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab('login')}
                      className={`pb-4 font-semibold text-lg transition-all relative ${
                        activeTab === 'login'
                          ? 'text-purple-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Sign In
                      {activeTab === 'login' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('register')}
                      className={`pb-4 font-semibold text-lg transition-all relative ${
                        activeTab === 'register'
                          ? 'text-purple-600'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      Create Account
                      {activeTab === 'register' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                      )}
                    </button>
                  </div>
                )}

                {/* Login Form */}
                {(activeTab === 'login' || userType === 'admin') && (
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {userType === 'admin' ? 'Admin Sign In' : 'Sign In'}
                    </button>
                  </form>
                )}

                {/* Register Form */}
                {activeTab === 'register' && userType === 'user' && (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </label>
                      <input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={registerData.company}
                          onChange={(e) => setRegisterData({...registerData, company: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6"
                    >
                      Create Account
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
