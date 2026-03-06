# Bhuvis Analytics Platform - Copilot Instructions

## Architecture Overview

**Bhuvis** is a full-stack **Indian Real Estate Analytics Platform** with a monorepo structure:

```
/client          → React 18 frontend (port 3000)
/server          → Node.js + Express backend (port 4000)
```

### Key Design Principles
- **Modular routing**: Separated concerns between API routes (auth, projects, market-trends, etc.)
- **Context-based state**: React Context for dark mode, authentication (coming: appointments)
- **Middleware-driven**: Error handling, CORS, helmet for security
- **In-memory data patterns**: Currently CSV/JSON datasets; transitioning to MongoDB

---

## Critical Developer Workflows

### Starting Development
```bash
npm run install-all    # Install all dependencies (root, client, server)
npm run dev            # Starts both frontend and backend concurrently
```

### Individual Development
```bash
npm run server         # Backend only (port 4000)
npm run client         # Frontend only (port 3000)
npm run build          # Production build
```

**Frontend proxy**: `client/package.json` has `"proxy": "http://localhost:4000"` for API calls.

---

## Project-Specific Patterns

### 1. **Page Structure** (`client/src/pages/`)
- Each page imports route-specific components (e.g., `LoginPage.js` uses `AuthForm.jsx`)
- Pages use `useNavigate()` from React Router for redirection
- All pages wrapped by `DarkModeProvider` in `App.js`

Example pattern in `LoginPage.js`:
```javascript
const { isDarkMode, toggleDarkMode } = useDarkMode(); // Dark mode context
const navigate = useNavigate();                         // Router navigation
localStorage.setItem('token', data.token);             // Token persistence
```

### 2. **Backend Route Organization** (`server/routes/`)
Each route file exports a single Express router:
- `/api/auth` → Authentication (login, register)
- `/api/market-trends` → Market data
- `/api/projects` → Project details
- `/api/compare` → City comparisons
- `/api/news` → News articles

Routes are mounted in `server.js` **after** data initialization.

### 3. **Context API for State Management**
Located in `client/src/contexts/`:
- `DarkModeContext.js`: Manages theme state + localStorage persistence
- **Pattern**: Create context, export custom hook (`useDarkMode`), wrap app in Provider
- Store user auth state similarly when implementing auth context

### 4. **Error Handling**
Server uses centralized middleware (`server/middleware/errorHandler.js`):
```javascript
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
app.use(notFoundHandler);
app.use(errorHandler);  // Must be last middleware
```

### 5. **Configuration Management**
`server/config/config.js` centralizes env variables using `dotenv`. Pattern:
```javascript
require('dotenv').config();
module.exports = {
  server: { port: process.env.PORT || 4000 },
  auth: { jwtSecret: process.env.JWT_SECRET }
};
```

### 6. **Color Scheme** (Design consistency)
- **Primary**: Royal Blue (#1E40AF)
- **Secondary**: Saffron (#F59E0B)
- **Accent**: Teal (#0D9488)
- Use TailwindCSS utilities: `from-primary-600 to-teal-600`

---

## Integration Points

### Frontend → Backend Communication
- Use Axios with baseURL: `axios.create({ baseURL: 'http://localhost:4000/api' })`
- Proxy in `client/package.json` allows `/api/*` calls in development
- Token passed via: `Authorization: Bearer <JWT>`

### Authentication Flow (Current)
- `LoginPage.js` POSTs to `/api/login` with email + password + role
- Backend (`server/routes/auth.js`) validates and returns JWT
- Frontend stores token in localStorage: `localStorage.setItem('token', data.token)`
- **Next step**: Implement Protected Routes + middleware to verify tokens

### Data Layer
- Currently uses CSV files in `server/data/` (parsed via `dataService.js`)
- **Transition**: Moving to MongoDB with Mongoose models
- Routes return JSON; frontend consumes via Axios/React

---

## Key Files to Reference

| File | Purpose | Notes |
|------|---------|-------|
| `client/src/App.js` | Route definitions | All pages registered here |
| `server/server.js` | Express app bootstrap | Middleware + route mounting |
| `server/config/config.js` | Environment config | Centralized settings |
| `client/src/contexts/DarkModeContext.js` | Dark mode state | Use as template for auth context |
| `server/routes/auth.js` | Login/Register endpoints | Implement JWT + Google OAuth here |
| `server/middleware/errorHandler.js` | Error handling | Pattern for middleware |

---

## MongoDB & Mongoose Conventions

When implementing database features:
- Create models in `server/models/` (e.g., `User.js`, `Appointment.js`)
- Use `mongoose.Schema` with consistent field names (userId, createdAt, etc.)
- Connect in `server.js` **before** initializing data
- Use `.populate()` for document references
- Timestamps: `{ type: Date, default: Date.now }`

---

## Common Workflows

### Adding a New API Endpoint
1. Create/update route file in `server/routes/`
2. Export router and mount in `server.js`
3. Test via `http://localhost:4000/api/<endpoint>`
4. Call from frontend via Axios

### Adding a New Page
1. Create file in `client/src/pages/`
2. Add route in `client/src/App.js`
3. Import/use contexts or custom hooks as needed
4. Use TailwindCSS for styling (no CSS files unless necessary)

### Securing an Endpoint
1. Create middleware (like `verifyToken.js`)
2. Import and apply to specific routes: `router.get('/protected', verifyToken, handler)`
3. Access user data via `req.user` (set by middleware)

---

## Environment Variables Template

```bash
# Backend (.env)
PORT=4000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_oauth_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret
```

---

## Code Quality & Linting

- Frontend: Uses ESLint config in `client/package.json`
- Backend: No linter configured (add ESLint for production)
- Naming: camelCase for JS, kebab-case for routes
- Components: Functional components + hooks (no class components)

---

## Deployment Checklist

- [ ] MongoDB Atlas URI in production `.env`
- [ ] JWT_SECRET set to strong random value
- [ ] CORS_ORIGIN updated to frontend domain
- [ ] Google OAuth credentials configured
- [ ] Frontend build: `npm run build` in `client/`
- [ ] Serve frontend from build/ folder
- [ ] Backend: Deploy Node process (Render, Railway, Heroku)
- [ ] Monitor logs for initialization errors

---

## Next Steps for Contributors

1. **Authentication Context**: Implement global auth state (similar to DarkModeContext)
2. **Protected Routes**: Wrapper component to guard pages behind login
3. **MongoDB Integration**: Replace in-memory user store with Mongoose models
4. **Google OAuth**: Integrate Firebase or Passport.js
5. **Appointment Booking**: Calendar UI + backend persistence
6. **Error Boundaries**: Add React error boundaries for graceful failures

