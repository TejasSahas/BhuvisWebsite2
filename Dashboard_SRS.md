Software Requirements Specification (SRS)

Project: BHUVIS X – Real Estate Analytics Dashboard
Date: September 18, 2025

1. Introduction

1.1 Purpose

This document specifies the requirements for the BHUVIS X web application, which provides real estate analytics for Pune micromarkets. The system enables users to visualize, compare, and analyze property data using a modern dashboard, with data sourced from automated web scrapers.

1.2 Scope

Interactive dashboard for real estate insights

Data ingestion via modular Python scrapers

REST API backend with PostgreSQL

Modern React frontend with map and chart visualizations

1.3 Definitions, Acronyms, and Abbreviations

Micromarket: A localized real estate region (e.g., Baner, Aundh)

Scraper: Automated script to collect property data from web sources

API: Application Programming Interface

UI: User Interface

1.4 References

2. Overall Description

2.1 Product Perspective

BHUVIS X is a three-tier web application:

Frontend: React + Vite + Tailwind (UI, charts, maps)

Backend: Node.js/Express REST API (data access, scraper trigger)

Scraper: Python scripts (data collection, modular architecture)

2.2 Product Functions

Filter and compare micromarkets

Visualize trends (price, rent, ROI)

Map-based activity zones

Trigger scrapers and view fresh data

2.3 User Classes and Characteristics

End Users: Property seekers, investors (view and analyze data)

Admins: Data managers, analysts (manage data, trigger scrapers)

2.4 Operating Environment

Web browser (Chrome, Edge, Firefox)

Node.js 18+, Python 3.x, PostgreSQL

Windows, macOS, Linux

2.5 Design and Implementation Constraints

Data accuracy depends on source websites

Scraper requires Chrome browser and driver

Environment variables for sensitive configuration

2.6 User Documentation

SCRAPERSREADME.md

3. System Features and Requirements

3.1 Dashboard

Filter toolbar (price, rent, market, type)

Map visualization (React-Leaflet)

Metric cards (price/sqft, rent/sqft, ROI)

Comparative analysis (bar/line charts)

3.2 Data Scraping

Modular Python scrapers for each source (MagicBricks, 99acres, YellowPages)

CLI and API trigger support

Configurable output and scheduling

3.3 API

REST endpoints for filters, metrics, map data, comparisons, and scraper triggers

3.4 Data Storage

PostgreSQL tables for each source and a master table

3.5 Security Requirements

Use of environment variables for credentials

No sensitive data in client code

3.6 Performance Requirements

Fast API responses (<1s typical)

Efficient scraping and data processing

3.7 Reliability & Availability

Error handling in scrapers and backend

Logging for failures and exceptions

3.8 Usability

Responsive, intuitive UI

Clear data presentation

4. External Interface Requirements

4.1 User Interfaces

Responsive web UI (React, Tailwind)

Map, charts, and filter controls

4.2 Hardware Interfaces

None (cloud/server deployment)

4.3 Software Interfaces

PostgreSQL database

Chrome browser for scraping

4.4 Communications Interfaces

HTTP/HTTPS REST API

5. Other Non-Functional Requirements

5.1 Security

Environment variables for credentials

Secure API endpoints

5.2 Maintainability

Modular codebase (frontend, backend, scraper separation)

Config-driven scraper modules

5.3 Portability

Cross-platform support (Windows, macOS, Linux)

6. System Architecture

6.1 Scraper Code Architecture

Entry Point: main.py orchestrates which scraper to run based on CLI args or API trigger.

Config: config.yaml and .env provide runtime and environment settings.

Scrapers: Each source (e.g., magicbricks.py, acres99.py, yellowpages.py) is a module in scrapers/ with a standard run(config) function.

Utils: Common helpers in utils/ (driver setup, parsing, storage).

Output: Data is saved as CSV (and/or to DB) with timestamped filenames.

Scheduler: schedular.py enables periodic scraping via config.

7. Workflow Diagram (PlantUML)

