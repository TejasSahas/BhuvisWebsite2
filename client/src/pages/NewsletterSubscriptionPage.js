import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import AuthForm from '../components/AuthForm';

const NewsletterSubscriptionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [preferences, setPreferences] = useState({
    daily: false,
    weekly: false,
    monthly: false,
    topicSpecific: false,
  });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const handlePreferenceChange = (pref) => {
    setPreferences(prev => ({ ...prev, [pref]: !prev[pref] }));
  };

  const handleTopicToggle = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleSubscribe = () => {
    // Submit subscription
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'newsletter',
          data: { preferences, selectedTopics }
        } 
      });
    }, 1000);
  };

  const topics = [
    'Market Trends',
    'Investment Opportunities',
    'Property Prices',
    'Rental Yields',
    'Location Intelligence',
    'Market Analysis',
    'Real Estate News',
    'Policy Updates',
  ];

  const hasAtLeastOnePreference = Object.values(preferences).some(v => v);

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
              <span className="ml-2 font-medium">Preferences</span>
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
                <Mail className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Newsletter & Blogs
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Login to subscribe to our newsletter and stay updated
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
                <Mail className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Select Your Preferences
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose how often you'd like to receive updates
                </p>
              </div>
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Frequency Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Update Frequency
                  </h3>
                  <div className="space-y-3">
                    {[
                      { key: 'daily', label: 'Daily Updates', desc: 'Get updates every day' },
                      { key: 'weekly', label: 'Weekly Digest', desc: 'Get a weekly summary' },
                      { key: 'monthly', label: 'Monthly Summary', desc: 'Get a monthly overview' },
                      { key: 'topicSpecific', label: 'Topic-Specific Newsletters', desc: 'Get updates on specific topics only' },
                    ].map(({ key, label, desc }) => (
                      <label
                        key={key}
                        className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                      >
                        <input
                          type="checkbox"
                          checked={preferences[key]}
                          onChange={() => handlePreferenceChange(key)}
                          className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">{label}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topic Selection (if topic-specific is selected) */}
                {preferences.topicSpecific && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Select Topics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleTopicToggle(topic)}
                          className={`p-3 rounded-lg border text-sm font-medium transition ${
                            selectedTopics.includes(topic)
                              ? 'bg-yellow-400 text-primary-900 border-yellow-400 shadow-glow-yellow'
                              : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-yellow-400'
                          }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Terms and Privacy */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                      required
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      I accept the <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleSubscribe}
                  disabled={!hasAtLeastOnePreference || !acceptedTerms || (preferences.topicSpecific && selectedTopics.length === 0)}
                  className="w-full btn-cta shadow-glow-yellow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>Subscribe to Newsletter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscriptionPage;

