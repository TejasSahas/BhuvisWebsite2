# Software Requirements Specification (SRS)

## 1. Introduction
### 1.1 Purpose
This SRS describes the requirements for the BHUVIS Real Estate Analysis Platform, focusing on the Dashboard and Bhuvi AI modules. The platform aims to provide actionable insights, comparative analysis, and AI-driven recommendations for real estate stakeholders.

### 1.2 Scope
BHUVIS is a web-based platform that offers:
- Interactive dashboards for data visualization
- AI-powered assistance (Bhuvi AI)
- Comparative analysis of real estate projects
- Market trends and news
- Secure user authentication

### 1.3 Definitions
- **Dashboard**: Visual interface for key metrics and analytics
- **Bhuvi AI**: AI assistant for user queries and recommendations
- **User**: Buyer, investor, or enterprise client

## 2. Overall Description
### 2.1 Product Perspective
- Modular React frontend (client)
- Node.js/Express backend (server)
- RESTful APIs for data and AI services

### 2.2 Product Functions
- User registration and login
- Dashboard with charts, tables, and reports
- Bhuvi AI chat interface
- Comparative analysis tools
- Market trends and news feed

### 2.3 User Classes
- Buyer
- Investor
- Enterprise

### 2.4 Operating Environment
- Web browsers (Chrome, Firefox, Edge)
- Windows, macOS, Linux

### 2.5 Design and Implementation Constraints
- Responsive design
- Secure authentication
- Scalable backend

## 3. Specific Requirements
### 3.1 Functional Requirements
- FR1: Users shall register and log in securely
- FR2: Users shall view personalized dashboards
- FR3: Users shall interact with Bhuvi AI for insights
- FR4: Users shall compare multiple projects
- FR5: Users shall access market trends and news

### 3.2 Non-Functional Requirements
- NFR1: System shall respond within 2 seconds for dashboard queries
- NFR2: System shall support at least 1000 concurrent users
- NFR3: Data shall be encrypted in transit and at rest
- NFR4: System shall be accessible on mobile and desktop

### 3.3 Interface Requirements
- RESTful API endpoints for all modules
- Intuitive UI with clear navigation

## 4. System Features
### 4.1 Dashboard
- Visualizes user-specific and market data
- Interactive charts and tables

### 4.2 Bhuvi AI
- Natural language chat interface
- Provides recommendations and answers

### 4.3 Comparative Analysis
- Side-by-side comparison of projects

### 4.4 Market Trends & News
- Aggregated news feed
- Trend analysis

## 5. Appendices
- Refer to `client/BHUVIsX_SRS.docx` for detailed dashboard requirements
- See `BHUVIS_Overview.md` for platform summary

---
This SRS is a living document and will be updated as the platform evolves.
