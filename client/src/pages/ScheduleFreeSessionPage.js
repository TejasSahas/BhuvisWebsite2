// /mnt/data/project/BhuvisWebsite2-Customer_Journey/client/src/pages/ScheduleFreeSessionPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';

/**
 * CompactCalendlyTwoSide
 * - small left info column and right calendly iframe inside a single card
 * - validates calendly URL and computes iframe height
 */
const CompactCalendlyTwoSide = ({ calendlyUrl, onBooked }) => {
  const containerRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(520);

  useEffect(() => {
    function calcHeight() {
      const vh = window.innerHeight;
      const headerEstimate = 120;
      const available = Math.max(420, Math.min(740, vh - headerEstimate));
      setIframeHeight(Math.max(420, available - 40));
    }
    calcHeight();
    window.addEventListener('resize', calcHeight);
    return () => window.removeEventListener('resize', calcHeight);
  }, []);

  // Calendly event listener
  useEffect(() => {
    function onMessage(e) {
      if (!e?.data) return;
      let data = e.data;

      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch {
        return;
      }

      if (data?.event === "calendly.event_scheduled" && typeof onBooked === "function") {
        onBooked(data);
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onBooked]);

  const isValidCalendly = calendlyUrl && calendlyUrl.startsWith("https://calendly.com/");
  if (!isValidCalendly) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <strong className="block text-sm font-medium text-yellow-800">Calendly not configured</strong>
        <p className="text-sm text-yellow-700 mt-1">
          Please set <code>REACT_APP_CALENDLY_30MIN</code> in <code>client/.env</code>.
        </p>
        <p className="text-xs text-yellow-600 mt-2">Current value: <code>{calendlyUrl || '(empty)'}</code></p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch bg-white/5 dark:bg-gray-800 rounded-xl
      shadow-xl overflow-hidden">

        {/* LEFT CARD INFO (NO TITLE / NO CALENDAR LOGO) */}
        <div className="md:w-1/3 w-full p-4 md:p-6 flex flex-col gap-3 bg-white/95 
        md:bg-transparent md:border-r md:border-white/5">

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Web conferencing details will be sent in your confirmation email.
          </p>

          <div className="mt-auto text-sm">
            <div className="text-xs text-gray-500">Time zone</div>
            <div className="text-sm text-gray-800 dark:text-gray-200">
              India Standard Time (IST)
            </div>
          </div>

          <div className="pt-3">
            <a href="#cookie" className="text-xs text-gray-500 hover:underline">
              Cookie settings
            </a>
          </div>
        </div>

        {/* RIGHT: Calendar */}
        <div className="md:flex-1 w-full p-3 md:p-4 bg-transparent">
          <div className="rounded-lg overflow-hidden border border-white/5 shadow-sm calendly-embed">
            <InlineWidget
              url={calendlyUrl}
              pageSettings={{
                hideEventTypeDetails: true,
                hideLandingPageDetails: true,
              }}
              styles={{ height: `${iframeHeight}px`, width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleFreeSessionPage = () => {
  const navigate = useNavigate();
  const [step] = useState(2); // direct to calendly
  const [isLoading, setIsLoading] = useState(false);

  const calendlyUrl = process.env.REACT_APP_CALENDLY_30MIN || "";

  const handleCalendlyScheduled = async (payload) => {
    setIsLoading(true);
    try {
      const apiBase = process.env.REACT_APP_API_BASE_URL || "";
      await axios.post(`${apiBase}/api/bookings/from-calendly`, { calendly: payload });
    } catch (err) {
      console.error("Failed to save booking", err);
    } finally {
      setIsLoading(false);
      navigate("/thank-you", { state: { type: "session" } });
    }
  };

  // global fallback
  useEffect(() => {
    function onMessage(e) {
      if (!e.data) return;
      let data = e.data;

      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch {
        return;
      }

      if (data?.event === "calendly.event_scheduled") {
        handleCalendlyScheduled(data);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 md:p-6">

          <div className="max-w-2xl mx-auto">
            <CompactCalendlyTwoSide
              calendlyUrl={calendlyUrl}
              onBooked={handleCalendlyScheduled}
            />
            {isLoading && (
              <div className="text-center mt-4 text-sm text-gray-600">
                Processing booking…
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScheduleFreeSessionPage;
