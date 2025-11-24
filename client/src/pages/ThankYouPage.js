import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

const ThankYouPage = () => {
  const location = useLocation();
  const { type, message } = location.state || {};

  const getMessage = () => {
    switch (type) {
      case 'session':
        return {
          title: 'Session Scheduled Successfully!',
          description: 'Your free session has been scheduled. We\'ll send you a confirmation email shortly with all the details.',
        };
      case 'call':
        return {
          title: 'Call Request Submitted!',
          description: 'We\'ve received your request for a consultation call. Our team will contact you within 24 hours to schedule your 10-minute requirement gathering call.',
        };
      case 'dashboard':
        return {
          title: 'Custom Dashboard Enquiry Received!',
          description: 'Thank you for your interest in a custom dashboard. We\'ll review your requirements and get back to you soon to schedule a consultation call.',
        };
      case 'newsletter':
        return {
          title: 'Successfully Subscribed!',
          description: 'Welcome to our newsletter! Check your email for a welcome message and start receiving updates based on your preferences.',
        };
      default:
        return {
          title: 'Thank You!',
          description: message || 'Your request has been submitted successfully. We\'ll get back to you soon.',
        };
    }
  };

  const { title, description } = getMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-cta shadow-glow-yellow inline-flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/services"
              className="btn-cta border-2 border-yellow-400 bg-transparent text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 inline-flex items-center justify-center gap-2 shadow-glow-yellow"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

