# Deprecated Enquiry-Related Pages (Developer Reference)

All CTAs that previously led to separate enquiry/demo/call flows now point to a **single Enquiry form** at **`/enquiry`**. The following pages are **kept for backward compatibility** (e.g. bookmarks, old links) but are **no longer used** as primary entry points for enquiries.

## Pages Not Used for Enquiry Flow

| Route | Page / Component | Previous purpose |
|-------|-------------------|-------------------|
| `/schedule-free-session` | `ScheduleFreeSessionPage` | "Book a Demo" / "Schedule Free Session" – Calendly/session booking |
| `/request-call` | `RequestCallPage` | "Request a Call" / "Book Consultation" – call request |
| `/custom-dashboard-enquiry` | `CustomDashboardEnquiryPage` | "Custom Dashboard Enquiry" – multi-step form (required login) |

## Current Behaviour

- **Book a Demo**, **Schedule a Call**, **Schedule Free Session**, **Request a Call**, **Custom Dashboard Enquiry**, and any similar CTAs across the site now navigate to **`/enquiry`**.
- The new **Enquiry** page (`EnquiryPage.js`) collects: Name, Phone, Email, Services & Products (dropdown), and optional Company and Message. **No login is required.**

## Optional Cleanup (Future)

If you want to remove deprecated code later:

1. You may remove or redirect the routes above (e.g. redirect `/schedule-free-session`, `/request-call`, `/custom-dashboard-enquiry` to `/enquiry`).
2. The modal components `MeetingBookingModal` and `CalendlyBooking` are still used where Calendly is embedded; only the **buttons** that opened "Schedule a Call" / "Book a Meeting" modals on About and Enterprise pages were changed to links to `/enquiry`. The modal components themselves can stay if you still use them elsewhere.

## Backend

- **New:** Enquiries are submitted to **`POST /api/enquiries`** (see `server/routes/enquiries.js` and `server/models/Enquiry.js`).
- The old custom-dashboard flow did not use a dedicated enquiry API; the new form persists submissions via the Enquiry model when MongoDB is configured.
