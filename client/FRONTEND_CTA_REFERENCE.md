# Frontend CTA & Routing Reference

**Rules for frontend changes:**
- Do **not** change any backend code.
- Preserve all CTA button **destinations** (these paths must keep redirecting correctly).
- This file is the single source of truth for path ↔ page associations.

---

## Route → Page (App.js – do not change paths)

| Path | Page Component |
|------|----------------|
| `/` | HomePage |
| `/services` | ServicesPage |
| `/services/lead-automation` | LeadAutomationPage |
| `/services/content-automation` | ContentAutomationPage |
| `/services/data-consulting` | DataConsultingPage |
| `/market-intelligence` | Redirects to `/services/data-consulting` |
| `/products/brokerjodo` | BrokerJodoPage |
| `/early-access` | EarlyAccessPage |
| `/market-trends` | MarketTrendsPage |
| `/comparative-analysis` | ComparativeAnalysisPage |
| `/projects/:id` | ProjectDetailsPage |
| `/news` | NewsPage |
| `/about` | AboutPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/buyer-report` | BuyerReportPage |
| `/enterprise-dashboard` | EnterpriseDashboardPage |
| `/investment-roadmap` | InvestmentRoadmapPage |
| `/bhuvisaipage` | BhuvisAIPage |
| `/dashboard` | DashboardPage (Pune dashboard) |
| `/schedule-free-session` | ScheduleFreeSessionPage |
| `/request-call` | RequestCallPage |
| `/custom-dashboard-enquiry` | CustomDashboardEnquiryPage |
| `/newsletter-subscribe` | NewsletterSubscriptionPage |
| `/thank-you` | ThankYouPage |

---

## Navbar (Navbar.js)

| Label | Path |
|-------|------|
| Home | `/` |
| Services (dropdown) | `/services`, `/services/lead-automation`, `/services/content-automation`, `/services/data-consulting` |
| (BhuvisAI & Dashboard live under Services → Data Consulting) | `/services/data-consulting` |
| Products (dropdown) | `/products/brokerjodo` |
| About Us | `/about` |
| Login | `/login` |

Logo link: `/`

---

## CTA Buttons by Page (keep these destinations)

### HomePage
- "Book a Demo" → `/schedule-free-session`
- "See How It Works" → `/request-call`
- "Explore Automation Services" → `/services`
- Section 3 stack cards → `/services/lead-automation`, `/services/content-automation`, `/services/data-consulting`
- "Learn More" (BrokerJodo) → `/products/brokerjodo`
- "Explore Market Intelligence" → `/services/data-consulting`
- Section 7 "Book Consultation" → `/request-call`, "Schedule Demo" → `/schedule-free-session`
- (Legacy: Schedule Free Session, Request Call, Services, Custom Dashboard – same paths as above where used)

### ServicesPage
- "Schedule Free Session" → `/schedule-free-session`
- "Request a Call" → `/request-call`
- "Custom Dashboard Enquiry" → `/custom-dashboard-enquiry`
- CTA section: Schedule → `/schedule-free-session`, Custom Dashboard → `/custom-dashboard-enquiry`

### AboutPage
- Services CTA(s) → `/services`

### MarketTrendsPage
- Hero / top CTA → `/enterprise-dashboard`
- Premium Intelligence: "Buyer Report" → `/buyer-report`, "Enterprise Dashboard" → `/enterprise-dashboard`

### ComparativeAnalysisPage
- "Buyer Report" → `/buyer-report`
- "Enterprise Dashboard" → `/enterprise-dashboard`
- "Investment Roadmap" → `/investment-roadmap`

### ProjectDetailsPage
- "Get Buyer Report" / Buyer Report CTAs → `/buyer-report` (Link or `window.location.href='/buyer-report'`)
- "Enterprise Dashboard" → `/enterprise-dashboard`

### DashboardPage (Pune Dashboard)
- CTA section → `/enterprise-dashboard`

### EnterpriseDashboardPage
- "Go to Dashboard" / access CTAs → `/dashboard`

### EarlyAccessPage
- "Back" → `/`
- CTA → `/dashboard`

### ThankYouPage
- "Home" → `/`
- "Explore Services" → `/services`

### NewsPage
- Newsletter CTA → `/newsletter-subscribe`

### Footer
- Home → `/`
- Market Trends → `/market-trends`
- Comparative Analysis → `/comparative-analysis`
- News → `/news`
- About → `/about`
- Newsletter signup → `/newsletter-subscribe`

### Auth cross-links (Login / Register / BuyerReport)
- Login ↔ Register: `href="/login"`, `href="/register"`

### InvestmentRoadmapPage
- "Back to Comparative" → `/comparative-analysis`

---

## Component: CTAButton.jsx

- When `to` is provided: renders `<Link to={to}>` — keep `to` unchanged per above.
- When no `to`: renders `<button>` with `onClick` (e.g. form submit). Do not convert these to links.

---

---

## Assets

- **Home page workflow chart:** Place the automation workflow image at `client/public/images/lead-automation-workflow.png`. The home page Section 2 uses this; if missing, a text fallback is shown.

---

*Last updated for frontend-only changes; backend and CTA destinations must remain unchanged.*
