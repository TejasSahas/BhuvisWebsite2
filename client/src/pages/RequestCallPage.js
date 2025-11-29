// /client/src/pages/RequestCallPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

/**
 * CompactCalendlyTwoSide (shared UI)
 * - same compact single-card layout used by ScheduleFreeSessionPage
 * - left info panel + right calendly iframe
 * - dynamic iframe height to avoid inner scrollbars
 */
const CompactCalendlyTwoSide = ({ calendlyUrl, title = "Request Free Call", duration = "10 min", onBooked }) => {
  const containerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(520);

  useEffect(() => {
    function calcHeight() {
      const vh = window.innerHeight;
      // headerEstimate: change if your site header is taller/shorter
      const headerEstimate = 140;
      const available = Math.max(420, Math.min(740, vh - headerEstimate));
      setIframeHeight(Math.max(420, available - 60));
    }
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);

  // Listen for Calendly postMessage and call onBooked
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

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch bg-white/5 dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* LEFT: info */}
        <div className="md:w-1/3 w-full p-4 md:p-6 flex flex-col gap-3 bg-white/95 md:bg-transparent md:border-r md:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <div className="text-xs text-gray-500">{duration}</div>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Quick requirement gathering call. Meeting link will be emailed after booking.
          </p>

          <div className="mt-auto text-sm">
            <div className="text-xs text-gray-500">Time zone</div>
            <div className="text-sm text-gray-800 dark:text-gray-200">India Standard Time (IST)</div>
          </div>

          <div className="pt-3">
            <a href="#cookie" className="text-xs text-gray-500 hover:underline">Cookie settings</a>
          </div>
        </div>

        {/* RIGHT: Calendly iframe */}
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

const RequestCallPage = () => {
  const navigate = useNavigate();

  // We removed the login step: page immediately shows the booking UI
  // If you want to require login, re-add auth logic.
  const calendlyUrl = process.env.REACT_APP_CALENDLY_10MIN || '';

  // Handler when Calendly booking occurs
  const handleCalendlyBooked = async (payload) => {
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || '';
      await axios.post(`${apiBase}/api/bookings/from-calendly`, { calendly: payload });
    } catch (err) {
      console.error('Failed to save booking', err);
      // proceed anyway — Calendly will have scheduled the event
    } finally {
      navigate('/thank-you', { state: { type: 'call' } });
    }
  };

  // Global fallback listener (optional redundancy)
  useEffect(() => {
    function onMessage(e) {
      if (!e?.data) return;
      let data = e.data;
      try {
        if (typeof data === 'string') data = JSON.parse(data);
      } catch {
        return;
      }
      if (data?.event === 'calendly.event_scheduled') {
        handleCalendlyBooked(data);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">

          {/* Calendly booking UI (same compact UI used on Schedule page) */}
          <div className="max-w-2xl mx-auto">
            <CompactCalendlyTwoSide
              calendlyUrl={calendlyUrl}
              title="Request Free Call"
              duration="10 min"
              onBooked={handleCalendlyBooked}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCallPage;
