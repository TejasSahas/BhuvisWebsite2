// CalendlyBooking.jsx
import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { InlineWidget } from "react-calendly";

/**
 * Simple Calendly inline widget wrapper.
 * Props:
 *  - url: full calendly event url (if not provided will fallback to REACT_APP_CALENDLY_30MIN)
 *  - onScheduled(payload): callback when Calendly posts event scheduled (raw message payload)
 */
const CalendlyBooking = ({ url, onScheduled, styles = { minHeight: 600 } }) => {
  const calendlyUrl = url || process.env.REACT_APP_CALENDLY_30MIN || "";

  const handleMessage = useCallback(
    (e) => {
      if (!e?.data) return;
      let data = e.data;
      try {
        if (typeof data === "string") data = JSON.parse(data);
      } catch (err) {
        // ignore non-JSON messages
        return;
      }
      if (data && data.event === "calendly.event_scheduled") {
        // Give parent a chance to process
        if (typeof onScheduled === "function") onScheduled(data);
      }
    },
    [onScheduled]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  if (!calendlyUrl) {
    return (
      <div className="p-4 text-red-600">
        Calendly URL missing. Set REACT_APP_CALENDLY_30MIN (or pass url prop).
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm mb-3">
        Pick a time below — Calendly will send a confirmation email and add the
        event to your calendar.
      </p>
      <div style={styles}>
        <InlineWidget url={calendlyUrl} pageSettings={{ hideEventTypeDetails: false }} styles={{ height: "100%" }} />
      </div>
    </div>
  );
};

CalendlyBooking.propTypes = {
  url: PropTypes.string,
  onScheduled: PropTypes.func,
  styles: PropTypes.object,
};

export default CalendlyBooking;
