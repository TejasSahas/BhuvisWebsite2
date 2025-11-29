// /mnt/data/project/BhuvisWebsite2-Customer_Journey/client/src/pages/ScheduleFreeSessionPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import AuthForm from '../components/AuthForm';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

/**
 * CompactCalendlyTwoSide
 * - small left info column and right calendly iframe inside a single card
 * - dynamically computes iframe height to avoid inner scrollbars on desktop
 * - responsive: stacks on small screens
 */
const CompactCalendlyTwoSide = ({ onBooked }) => {
  const containerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(520); // default

  // compute available height so iframe fits without scroll (desktop)
  useEffect(() => {
    function calcHeight() {
      const vh = window.innerHeight;
      // headerEstimate: estimate total page header + top paddings.
      // Tweak this value to make iframe smaller/larger to avoid inner Calendly scrolling.
      const headerEstimate = 160;
      const available = Math.max(420, Math.min(740, vh - headerEstimate));
      // leave some room for left panel and card padding
      setIframeHeight(Math.max(420, available - 60));
    }
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);

  // listen to Calendly postMessage event
  useEffect(() => {
    function onMessage(e) {
      if (!e?.data) return;
      let data = e.data;
      try {
        if (typeof data === 'string') data = JSON.parse(data);
      } catch {
        return;
      }
      if (data?.event === 'calendly.event_scheduled' && typeof onBooked === 'function') {
        onBooked(data);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onBooked]);

  const calendlyUrl = process.env.REACT_APP_CALENDLY_30MIN || '';

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      {/* Single card container */}
      <div className="flex flex-col md:flex-row items-stretch bg-white/5 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* LEFT: compact info (fixed width on md) */}
        <div className="md:w-1/3 w-full p-4 md:p-6 flex flex-col gap-3 bg-white/90 md:bg-transparent md:border-r md:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Schedule Free Call</h3>
              <div className="text-xs text-gray-500">20 min</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Web conferencing details provided upon confirmation.
          </p>

          <div className="mt-auto text-sm">
            <div className="text-xs text-gray-500">Time zone</div>
            <div className="text-sm text-gray-800 dark:text-gray-200">India Standard Time (IST)</div>
          </div>

          <div className="pt-3">
            <a href="#cookie" className="text-xs text-gray-500 hover:underline">Cookie settings</a>
          </div>
        </div>

        {/* RIGHT: calendar area (fills remaining space) */}
        <div className="md:flex-1 w-full p-3 md:p-4 bg-transparent">
          <div className="rounded-lg overflow-hidden border border-white/5 shadow-sm">
            <InlineWidget
              url={calendlyUrl}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true
              }}
              styles={{ height: `${iframeHeight}px`, width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleFreeSessionPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Login, 2: Time Sheet, 3: Thank You
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeSlot, setTimeSlot] = useState(null);

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

  // Called when Calendly posts event_scheduled via postMessage (we listen below)
  const handleCalendlyScheduled = async (payload) => {
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || '';
      await axios.post(`${apiBase}/api/bookings/from-calendly`, { calendly: payload });
      // move to thank you step
      setStep(3);
      setTimeout(() => navigate('/thank-you', { state: { type: 'session' } }), 800);
    } catch (err) {
      console.error('Failed to save calendly booking', err);
      // still move to thank-you because Calendly already scheduled the event
      setStep(3);
      setTimeout(() => navigate('/thank-you', { state: { type: 'session' } }), 800);
    }
  };

  // Listen for calendly.event_scheduled (global listener as fallback)
  useEffect(() => {
    function onMessage(e) {
      if (!e?.data) return;
      let data = e.data;
      try {
        if (typeof data === 'string') data = JSON.parse(data);
      } catch (err) {
        return;
      }
      if (data && data.event === 'calendly.event_scheduled') {
        handleCalendlyScheduled(data);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (step === 3) {
    // you already navigate to /thank-you in the handler; keep local fallback
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <Calendar className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Schedule a Free Session
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Login to schedule your free consultation session with our team
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <AuthForm mode="login" onSuccess={handleLoginSuccess} />
              </div>
            </div>
          )}

          {step === 2 && (
            <CompactCalendlyTwoSide onBooked={async (payload) => {
              const apiBase = process.env.REACT_APP_API_BASE_URL || '';
              try {
                await axios.post(`${apiBase}/api/bookings/from-calendly`, { calendly: payload });
              } catch (err) {
                console.error('Failed to save booking', err);
              }
              // go to thank-you page
              navigate('/thank-you', { state: { type: 'session' } });
            }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleFreeSessionPage;
  