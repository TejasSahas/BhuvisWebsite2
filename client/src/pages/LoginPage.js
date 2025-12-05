import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthForm from "../components/AuthForm";



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('Investor');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-primary-900 via-primary-800 to-teal-800">
      {/* Left: Image & Content */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-black/30 dark:bg-black/40 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200"
          alt="Real estate analytics dashboard"
          className="w-full h-full object-cover absolute inset-0 opacity-60"
        />
        <div className="relative z-10 p-8 text-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h2a2 2 0 012 2v14M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14M15 21V7a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>
            </div>
            <span className="text-xl font-bold font-display mt-2 text-white drop-shadow">BhuvisX</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Welcome to BhuvisX</h2>
          <p className="text-base text-primary-100 mb-4 drop-shadow">
            Unlock data-driven real estate insights and investment opportunities.
          </p>
          <ul className="text-left text-white/90 text-sm space-y-1.5 mx-auto max-w-xs">
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-saffron-400 rounded-full"></span> Secure & Private</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-saffron-400 rounded-full"></span> Personalized Dashboard</li>
            <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-saffron-400 rounded-full"></span> Real-time Analytics</li>
          </ul>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Right: Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gradient-to-br from-white/70 via-white/60 to-primary-100/60 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-primary-900/60 px-2 py-8 sm:px-6 sm:py-16 relative z-10 min-h-screen">
        <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-10 sm:p-14 border border-primary-100 dark:border-primary-800 backdrop-blur-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-600 rounded-lg flex items-center justify-center shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h2a2 2 0 012 2v14M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14M15 21V7a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>
            </div>
            <span className="text-lg font-bold font-display mt-2 text-black dark:text-white">BhuvisX</span>
          </div>
          <h2 className="text-3xl font-extrabold text-center mb-2 text-primary-700 dark:text-primary-300 tracking-tight">Sign in to BhuvisX</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Access your personalized real estate dashboard and insights.</p>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  className="w-full px-4 py-2 pr-12 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition">
                <option>Investor</option>
                <option>Real estate consultant</option>
                <option>Builder</option>
                <option>Agent</option>
                <option>Other</option>
              </select>
            </div>
            {error && <div className="text-red-600 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="btn-cta shadow-glow-yellow w-full"
            >
              <span>Login</span>
            </button>
          </form>
          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <span>New to BhuvisX? <a href="/register" className="text-primary-600 hover:underline">Register here</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
