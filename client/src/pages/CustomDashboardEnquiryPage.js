import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import TimeSheetBooking from '../components/TimeSheetBooking';

const CustomDashboardEnquiryPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    objective: '',
    profession: '',
    area: '',
    location: '',
    reason: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setStep(2);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setStep(2);
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeSlotSelect = (slot) => {
    // Submit the enquiry
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'dashboard',
          data: { ...formData, timeSlot: slot }
        } 
      });
    }, 1000);
  };

  const canProceed = () => {
    switch (step) {
      case 2:
        return formData.objective !== '';
      case 3:
        return formData.profession !== '';
      case 4:
        return formData.area !== '' && formData.location !== '';
      case 5:
        return formData.reason !== '';
      default:
        return true;
    }
  };

  const steps = [
    { num: 1, label: 'Login' },
    { num: 2, label: 'Objective' },
    { num: 3, label: 'Profession' },
    { num: 4, label: 'Area/Location' },
    { num: 5, label: 'Reason' },
    { num: 6, label: 'Schedule' },
    { num: 7, label: 'Complete' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-4">
            {steps.map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className={`flex items-center ${step >= s.num ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= s.num ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className="ml-2 text-xs font-medium hidden sm:inline">{s.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-1 ${step > s.num ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <BarChart3 className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Enquiry for Custom Dashboards
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Login to start your custom dashboard enquiry
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <AuthForm mode="login" onSuccess={handleLoginSuccess} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What is your dashboard objective?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us what you want to achieve with your custom dashboard
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="E.g., Track property prices across multiple cities, analyze rental yields, monitor market trends..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                  required
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What is your profession?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This helps us tailor the dashboard to your needs
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select your profession</option>
                  <option value="investor">Real Estate Investor</option>
                  <option value="buyer">Property Buyer</option>
                  <option value="company">Real Estate Company</option>
                  <option value="consultant">Real Estate Consultant</option>
                  <option value="developer">Property Developer</option>
                  <option value="agent">Real Estate Agent/Broker</option>
                  <option value="analyst">Market Analyst</option>
                  <option value="other">Other</option>
                </select>
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Area & Location
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Which area and location are you interested in?
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Area/Region *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="E.g., Pune, Mumbai, Bangalore..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Specific Location/Neighborhood *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="E.g., Hinjewadi, Baner, Koregaon Park..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Reason for Custom Dashboard
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Why do you need a custom dashboard?
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="E.g., Need to track multiple properties, require specific metrics, want automated reporting..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white"
                  required
                />
                <div className="flex gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Schedule Your Consultation Call
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a time for your 10-minute requirement gathering call
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <TimeSheetBooking
                  onTimeSlotSelect={handleTimeSlotSelect}
                  duration={10}
                  title="Select Time for Requirement Gathering Call"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDashboardEnquiryPage;

