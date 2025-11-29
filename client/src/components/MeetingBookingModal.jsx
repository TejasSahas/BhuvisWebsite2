import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Building2, Phone, MessageSquare } from 'lucide-react';
import axios from 'axios';
import CalendlyBooking from './CalendlyBooking';

const MeetingBookingModal = ({ isOpen, onClose, variant = 'meeting' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    serviceInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In production, this would call your API endpoint
      // await axios.post('/api/appointments', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: '', email: '', phone: '', company: '', role: '',
          serviceInterest: '', preferredDate: '', preferredTime: '', message: ''
        });
      }, 2000);
    } catch (err) {
      setError('Failed to submit. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isCall = variant === 'call';

  // calendly variants: 'calendly_30', 'calendly_10', 'calendly_custom'
  const isCalendly = variant && variant.startsWith('calendly');

  // map variant to Calendly URL (fall back to env)
  const getCalendlyUrl = (v) => {
    if (v === 'calendly_10') return process.env.REACT_APP_CALENDLY_10MIN || process.env.REACT_APP_CALENDLY_30MIN;
    if (v === 'calendly_custom') return process.env.REACT_APP_CALENDLY_CUSTOM || process.env.REACT_APP_CALENDLY_30MIN;
    return process.env.REACT_APP_CALENDLY_30MIN;
  };

  // Called when Calendly posts event_scheduled via postMessage (CalendlyBooking will call this)
  const handleCalendlyScheduled = async (payload) => {
    try {
      // you can store whatever part of payload you need. Here we post whole payload.
      const apiBase = process.env.REACT_APP_API_BASE_URL || '';
      await axios.post(`${apiBase}/api/bookings/from-calendly`, { calendly: payload });
      // Show a basic success state (alternatively close modal)
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to record Calendly booking:", err);
      setError('Booking recorded by Calendly, but we failed to save it to our system. We will investigate.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isCalendly ? (variant === 'calendly_10' ? 'Schedule a 10-min Call' : variant === 'calendly_custom' ? 'Request: Custom Dashboard' : 'Schedule a 30-min Session') : (isCall ? 'Schedule a Consultation Call' : 'Book a Meeting')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isCalendly
                ? 'Pick a time below. A confirmation and calendar invite will be sent.'
                : isCall
                  ? 'Let\'s discuss your requirements and how we can help'
                  : 'Meet with our team to understand your needs'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* If Calendly variant, render CalendlyBooking component */}
        {isCalendly ? (
          <div className="p-6">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Booking confirmed!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check your email for confirmation and calendar invite.
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 mb-4">
                    {error}
                  </div>
                )}
                <CalendlyBooking
                  url={getCalendlyUrl(variant)}
                  onScheduled={handleCalendlyScheduled}
                />
              </>
            )}
          </div>
        ) : (
          // Original form UI
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Request Submitted!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We'll contact you shortly to confirm your {isCall ? 'call' : 'meeting'}.
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <Building2 className="w-4 h-4 inline mr-1" />
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role/Position
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select your role</option>
                      <option value="investor">Real Estate Investor</option>
                      <option value="buyer">Property Buyer</option>
                      <option value="company">Real Estate Company</option>
                      <option value="consultant">Real Estate Consultant</option>
                      <option value="developer">Property Developer</option>
                      <option value="agent">Real Estate Agent/Broker</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Service Interest
                    </label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Select service</option>
                      <option value="advisory">Investment Advisory</option>
                      <option value="data">Data Services</option>
                      <option value="analysis">Market Analysis</option>
                      <option value="custom">Custom Data Compilation</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>

                  {!isCall && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required={!isCall}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Preferred Time *
                        </label>
                        <input
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required={!isCall}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    Tell us about your requirements
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe what you're looking for, your investment goals, or specific data needs..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-cta shadow-glow-yellow"
                  >
                    {loading ? 'Submitting...' : `Schedule ${isCall ? 'Call' : 'Meeting'}`}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MeetingBookingModal;
