import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import TimeSheetBooking from '../components/TimeSheetBooking';

const RequestCallPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Login, 2: Time Sheet, 3: Thank You
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
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

  const handleTimeSlotSelect = (slot) => {
    // Submit the call request
    setTimeout(() => {
      navigate('/thank-you', { state: { type: 'call' } });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Login</span>
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Schedule Call</span>
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Complete</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <Phone className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Request for a Call
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Login to schedule a 10-minute requirement gathering call with our team
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
                <Phone className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Schedule Your 10-Minute Call
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Select a convenient time for your requirement gathering call
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

export default RequestCallPage;


