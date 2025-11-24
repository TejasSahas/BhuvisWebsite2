import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, isFirebaseAvailable } from '../firebase';
import { useNavigate } from 'react-router-dom';

import AuthForm from "../components/AuthForm";

// Removed duplicate default export for Register




const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Investor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! You can now log in.');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  // Google registration handler
  const handleGoogleRegister = async () => {
    if (!isFirebaseAvailable()) {
      setError('Google sign-in is not configured. Please use email registration instead.');
      return;
    }
    
    setError('');
    setSuccess('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      // Send token to backend
      const response = await fetch('/api/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => navigate('/'), 1200);
      } else {
        setError(data.message || 'Google registration failed');
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gradient-to-br from-primary-900 via-primary-800 to-teal-800">
      {/* Left: Image & Content */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-black/30 dark:bg-black/40 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200"
          alt="Register real estate analytics"
          className="w-full h-full object-cover absolute inset-0 opacity-60"
        />
        <div className="relative z-10 p-12 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h2a2 2 0 012 2v14M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14M15 21V7a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>
            </div>
            <span className="text-2xl font-bold font-display mt-2 text-white drop-shadow">BhuvisX</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Join BhuvisX</h2>
          <p className="text-lg text-primary-100 mb-6 drop-shadow">
            Register to access premium real estate analytics, market trends, and investment tools tailored for you.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Right: Register Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 bg-gradient-to-br from-white/70 via-white/60 to-primary-100/60 dark:from-gray-900/80 dark:via-gray-900/70 dark:to-primary-900/60 px-2 py-8 sm:px-6 sm:py-16 relative z-10 min-h-screen">
        <div className="w-full max-w-xl bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-10 sm:p-14 border border-primary-100 dark:border-primary-800 backdrop-blur-md">
          <div className="flex flex-col items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-600 rounded-lg flex items-center justify-center shadow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V7a2 2 0 012-2h2a2 2 0 012 2v14M9 21V7a2 2 0 012-2h2a2 2 0 012 2v14M15 21V7a2 2 0 012-2h2a2 2 0 012 2v14"/></svg>
            </div>
            <span className="text-lg font-bold font-display mt-2 text-black dark:text-white">BhuvisX</span>
          </div>
          <h2 className="text-3xl font-extrabold text-center mb-2 text-primary-700 dark:text-primary-300 tracking-tight">Create Your Account</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Sign up to unlock your personalized dashboard and insights.</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 w-full">
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Full Name</label>
              <input type="text" required placeholder="Your full name" className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Phone Number</label>
              <input type="tel" required placeholder="10-digit mobile number" className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">City</label>
              <input type="text" required placeholder="Your city" className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-xl focus:ring-2 focus:ring-primary-400 dark:bg-gray-800 dark:text-white transition">
                <option>Investor</option>
                <option>Real estate consultant</option>
                <option>Builder</option>
                <option>Agent</option>
                <option>Other</option>
              </select>
            </div>
            {error && <div className="text-red-600 text-sm text-center md:col-span-2">{error}</div>}
            {success && <div className="text-green-600 text-sm text-center md:col-span-2">{success}</div>}
            <button type="submit" className="btn-cta shadow-glow-yellow w-full md:col-span-2 mt-2">
              <span>Register</span>
            </button>
          </form>
          {isFirebaseAvailable() && (
            <div className="flex flex-col gap-4 mt-6 w-full">
              <button type="button" onClick={handleGoogleRegister} className="w-full py-3 bg-white/90 text-primary-700 border border-primary-200 dark:border-primary-700 font-semibold rounded-xl shadow-md transition-all duration-200 hover:bg-primary-50 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="20"/><path fill="#4285F4" d="M34.6 24.2c0-.7-.1-1.4-.2-2H24v4.1h6c-.3 1.6-1.7 4.6-6 4.6-3.6 0-6.6-3-6.6-6.6s3-6.6 6.6-6.6c2.1 0 3.5.9 4.3 1.7l3-2.9C29.7 18.1 27.2 17 24 17c-5.2 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.4z"/><path fill="#34A853" d="M24 38c3.2 0 5.9-1.1 7.8-2.9l-3.8-3c-1 .7-2.3 1.2-4 1.2-3.1 0-5.7-2.1-6.6-5h-4v3.1C15.9 35.7 19.6 38 24 38z"/><path fill="#FBBC05" d="M17.4 27.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3v-3.1h-4c-.8 1.6-1.3 3.3-1.3 5.4s.5 3.8 1.3 5.4l4-3.1z"/><path fill="#EA4335" d="M24 17c2.2 0 4.1.7 5.6 2l4.2-4.2C31.9 12.7 28.7 11 24 11c-4.4 0-8.1 2.3-10.1 5.7l4 3.1c.9-2.9 3.5-5 6.6-5z"/></g></svg>
                Register with Google
              </button>
            </div>
          )}

          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <span>Already have an account? <a href="/login" className="text-primary-600 hover:underline">Login</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

