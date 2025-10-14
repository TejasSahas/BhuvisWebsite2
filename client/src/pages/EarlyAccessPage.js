import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  Target, 
  Shield, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import axios from 'axios';

const EarlyAccessPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    interests: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          interests: [...prev.interests, value]
        };
      } else {
        return {
          ...prev,
          interests: prev.interests.filter(interest => interest !== value)
        };
      }
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock API call
      // await axios.post('/api/early-access', formData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        interests: []
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Early Access",
      description: "Be among the first to experience our dashboard"
    },
    {
      icon: Target,
      title: "Custom Features",
      description: "Tailored solutions for your specific needs"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Dedicated support team for early adopters"
    }
  ];

  // If form was successfully submitted
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <section className="relative gradient-hero text-white overflow-hidden pt-16">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
          <div className="relative container-custom py-6 md:py-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="hero-title text-white drop-shadow-2xl mb-6">
                Thank You for Your Interest!
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
                We've received your request for early access to the BhuvisX Dashboard.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <div className="card p-8 max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Application Received
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our team will review your application and get back to you shortly with next steps.
                In the meantime, you can explore other features of BhuvisX.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/" className="btn-secondary">
                  <span>Return to Home</span>
                </Link>
                <Link to="/dashboard" className="btn-cta">
                  <span>Try Demo Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=1200')] bg-cover bg-center opacity-15"></div>
        <div className="relative container-custom py-6 md:py-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-white drop-shadow-2xl mb-6">
              Get Early Access to BhuvisX Dashboard
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed mb-6">
              Be among the first to experience our enterprise-grade real estate analytics dashboard.
              Sign up now for exclusive early access and special benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4 md:py-6 bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Dashboard Coming Soon
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We're building something amazing! Our enterprise dashboard is currently in development 
              and will be available soon. Sign up now to get early access and exclusive updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-6 bg-gradient-to-br from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-teal-900/20 rounded-xl border border-primary-200 dark:border-primary-700">
                  <Icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Apply for Early Access
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-800 dark:text-red-200">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role/Position
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="block w-full px-4 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select your role</option>
                      <option value="investor">Real Estate Investor</option>
                      <option value="agent">Real Estate Agent/Broker</option>
                      <option value="developer">Property Developer</option>
                      <option value="analyst">Market Analyst</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Areas of Interest (select all that apply)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interest-market"
                        name="interests"
                        value="market-trends"
                        checked={formData.interests.includes('market-trends')}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interest-market" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Market Trends Analysis
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interest-investment"
                        name="interests"
                        value="investment"
                        checked={formData.interests.includes('investment')}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interest-investment" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Investment Opportunities
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interest-portfolio"
                        name="interests"
                        value="portfolio"
                        checked={formData.interests.includes('portfolio')}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interest-portfolio" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Portfolio Management
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="interest-location"
                        name="interests"
                        value="location"
                        checked={formData.interests.includes('location')}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="interest-location" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Location Intelligence
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-cta shadow-glow-yellow w-full md:w-auto md:px-8 py-3"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span>Submit Application</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EarlyAccessPage;
