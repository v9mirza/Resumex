# Project Structure

This document covers every file in the Resumex codebase — what it is, what it owns, and how it relates to the rest of the system.

---

## Root

```
Resumex/
├── backend/
├── frontend/
├── vercel.json          # Monorepo routing for Vercel (rewrites API calls to the backend)
├── README.md
└── PROJECT_STRUCTURE.md
```

- **`vercel.json`** — Top-level Vercel config. Routes `/api/*` to the backend service and everything else to the frontend SPA.

---

## Backend (`/backend`)

Node.js + Express REST API. Handles authentication, resume persistence, and admin operations.

```
backend/
├── src/
│   ├── index.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Resume.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resumes.js
│   │   └── adminRoutes.js
│   └── controllers/
│       ├── authController.js
│       ├── resumeController.js
│       └── adminController.js
├── .env                 # Local secrets (not committed)
├── .env.example         # Template showing required env variables
└── package.json
```

### Entry point

**`src/index.js`**
Starts the Express server. Wires up CORS, JSON body parsing, and registers all route groups under `/api/auth`, `/api/resumes`, and `/api/admin`. Calls `connectDB()` before listening.

### Config

**`src/config/db.js`**
Mongoose connection helper. Reads `MONGO_URI` from env and connects. Called once at startup from `index.js`.

### Models

**`src/models/User.js`**
Mongoose schema for a user account.
- Fields: `email`, `password` (bcrypt hash), `role` (`"user"` | `"admin"`), timestamps.
- The `role` field is the only gate for the admin panel. It defaults to `"user"` and must be changed directly in the database to `"admin"`.

**`src/models/Resume.js`**
Mongoose schema for a single resume.
- Fields: `user` (ref to `User`), `title`, `data` (a large JSON object containing all resume sections: basics, education, experience, skills, etc.), timestamps.

### Middleware

**`src/middleware/authMiddleware.js`**
Exports two middleware functions:
- `protect` — verifies the `Authorization: Bearer <token>` header. Attaches the decoded user to `req.user`. Returns 401 if missing or invalid.
- `admin` — checks that `req.user.role === "admin"`. Returns 403 if not. Always used after `protect`.

### Routes

**`src/routes/auth.js`**
| Method | Path | Handler |
|--------|------|---------|
| POST | `/api/auth/register` | `registerUser` |
| POST | `/api/auth/login` | `loginUser` |
| PUT | `/api/auth/profile` | `updateUserProfile` (protected) |
| DELETE | `/api/auth/profile` | `deleteAccount` (protected) |

**`src/routes/resumes.js`**
All routes are protected by `protect`. Users can only access their own resumes unless they are an admin.

| Method | Path | Handler |
|--------|------|---------|
| GET | `/api/resumes` | `getResumes` |
| POST | `/api/resumes` | `createResume` |
| GET | `/api/resumes/:id` | `getResumeById` |
| PUT | `/api/resumes/:id` | `updateResume` |
| DELETE | `/api/resumes/:id` | `deleteResume` |

**`src/routes/adminRoutes.js`**
All routes are protected by `protect` + `admin`.

| Method | Path | Handler |
|--------|------|---------|
| GET | `/api/admin/stats` | `getStats` |
| GET | `/api/admin/users` | `getUsers` |
| GET | `/api/admin/resumes` | `getResumes` |
| DELETE | `/api/admin/users/:id` | `deleteUser` |

### Controllers

**`src/controllers/authController.js`**
Business logic for account management: hashes passwords with bcrypt, validates credentials on login, signs and returns JWTs, handles profile updates and account deletion.

**`src/controllers/resumeController.js`**
CRUD logic for resumes. Enforces per-user ownership — a user can only read, update, or delete resumes linked to their own `_id`. Admins bypass this check.

**`src/controllers/adminController.js`**
Aggregates platform-wide stats (user count, resume count), fetches full user and resume lists, and handles user deletion.

---

## Frontend (`/frontend`)

React + Vite SPA. Split-screen resume builder with live preview, multi-template rendering, and PDF export.

```
frontend/
├── public/
│   ├── resumex.svg      # App favicon/logo
│   ├── mockup.png       # Marketing screenshot used on the landing page
│   ├── robots.txt       # Crawler instructions
│   └── sitemap.xml      # XML sitemap for search engines
├── src/
│   ├── main.jsx
│   ├── app/
│   │   └── App.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Builder.jsx
│   │   ├── Preview.jsx
│   │   ├── Profile.jsx
│   │   ├── Admin.jsx
│   │   ├── NotFound.jsx
│   │   ├── LegalTerms.jsx
│   │   └── LegalPrivacy.jsx
│   ├── components/
│   │   ├── LandingNav.jsx
│   │   ├── LandingFooter.jsx
│   │   ├── Seo.jsx
│   │   ├── editor/
│   │   │   ├── Editor.jsx
│   │   │   └── steps/
│   │   │       ├── Basics.jsx
│   │   │       ├── About.jsx
│   │   │       ├── Experience.jsx
│   │   │       ├── Education.jsx
│   │   │       ├── Skills.jsx
│   │   │       ├── Projects.jsx
│   │   │       ├── Certifications.jsx
│   │   │       ├── Achievements.jsx
│   │   │       ├── Languages.jsx
│   │   │       └── Template.jsx
│   │   └── preview/
│   │       └── LivePreview.jsx
│   ├── templates/
│   │   ├── Classic.jsx
│   │   ├── Modern.jsx
│   │   └── Minimal.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── state/
│   │   └── useResume.jsx
│   ├── services/
│   │   └── api.js
│   ├── data/
│   │   └── sampleResume.js
│   └── styles/
│       └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── vercel.json          # Frontend-level Vercel config (SPA fallback rewrites)
├── .env.example
└── package.json
```

### Entry points

**`src/main.jsx`**
React DOM entry. Mounts `<App />` into the `#root` div in `index.html`.

**`src/app/App.jsx`**
Defines all client-side routes using React Router. Wraps the tree with `AuthProvider` and `ThemeProvider`. Implements `ProtectedRoute` — any route that requires auth redirects to `/login` if no session is found.

### Pages

**`Home.jsx`**
Public landing page. Shows the product description, feature highlights, and uses `mockup.png` from `public/`. Buttons dynamically switch between "Get Started" and "Go to Dashboard" depending on auth state.

**`Login.jsx` / `Register.jsx`**
Auth forms. Call `login()` and `register()` from `AuthContext`. On success, redirect to `/dashboard`.

**`Dashboard.jsx`**
The user's resume list. Shows all saved resumes as cards. Supports creating a new resume (POST), navigating into the builder (edit), and deleting resumes with a confirmation.

**`Builder.jsx`**
The core page. Renders a split-screen layout: `Editor` on the left, `LivePreview` on the right. Loads an existing resume from the API on mount (or initializes a blank one). Handles saving — debounces changes and PUTs the full `data` object back to the API.

**`Preview.jsx`**
Full-screen, print-optimized view of a single resume. Strips the app chrome and renders only the template output. Used as the target page when the user triggers PDF export via the browser's print dialog.

**`Profile.jsx`**
User settings page. Allows changing password (PUT `/api/auth/profile`) and permanently deleting the account (DELETE `/api/auth/profile`). Also displays the user's current role.

**`Admin.jsx`**
Admin-only dashboard. Displays platform stats (total users, total resumes), a full user list with delete capability, and a list of all resumes in the system. Redirects non-admins away on load.

**`NotFound.jsx`**
Standard 404 page. Rendered by React Router for any unmatched path.

**`LegalTerms.jsx` / `LegalPrivacy.jsx`**
Static legal pages for Terms of Service and Privacy Policy. Linked from `LandingFooter`.

### Components

**`LandingNav.jsx`**
Navigation bar used on the public landing page. Includes the logo and auth-aware links.

**`LandingFooter.jsx`**
Footer for the landing page. Contains links to `LegalTerms` and `LegalPrivacy`.

**`Seo.jsx`**
A thin wrapper around React Helmet (or equivalent). Accepts `title` and `description` props and injects them into the document `<head>`. Used at the top of every page component for per-route meta tags.

**`components/editor/Editor.jsx`**
The left panel of the builder. Renders a stepped form UI. Each step maps to one of the section components in `steps/`. Manages which step is currently active and passes the shared resume state down.

**`components/editor/steps/`**
Each file owns one section of the resume form:

| File | Section |
|------|---------|
| `Basics.jsx` | Name, job title, contact details, links |
| `About.jsx` | Professional summary / about paragraph |
| `Experience.jsx` | Work history — company, role, dates, description |
| `Education.jsx` | Degrees, institutions, graduation dates |
| `Skills.jsx` | Skills list with optional proficiency levels |
| `Projects.jsx` | Personal or professional projects with links |
| `Certifications.jsx` | Certifications and issuing organizations |
| `Achievements.jsx` | Awards and notable achievements |
| `Languages.jsx` | Spoken languages and proficiency |
| `Template.jsx` | Template picker — lets the user switch between Classic, Modern, and Minimal |

**`components/preview/LivePreview.jsx`**
The right panel of the builder. Reads the current resume data from state and passes it to the correct template component based on `resume.meta.template`. Re-renders on every state change to keep the preview in sync.

### Templates

Each template is a self-contained React component that accepts the full resume `data` object as props and renders it as styled HTML. They are the only place layout and visual design live — the editor and preview are template-agnostic.

- **`Classic.jsx`** — Traditional single-column layout. High ATS compatibility.
- **`Modern.jsx`** — Two-column layout with a sidebar for contact and skills.
- **`Minimal.jsx`** — Clean, typographic layout with minimal decoration.

### Context & State

**`context/AuthContext.jsx`**
Global user session state. On load, reads the stored token from `localStorage` and decodes the user. Provides `user`, `login()`, `register()`, and `logout()` to the entire app via `useAuth()` hook.

**`context/ThemeContext.jsx`**
Light/dark theme state. Stores the current preference in `localStorage` and toggles a class on `<body>` or a CSS custom property. Provides `theme` and `toggleTheme()` via `useTheme()` hook.

**`state/useResume.jsx`**
Custom hook that manages the in-memory resume editor state. Holds the full resume `data` object and exposes updater functions for each section. Used by `Builder.jsx` and passed down to `Editor` and `LivePreview`.

### Services

**`services/api.js`**
Axios instance preconfigured with the API base URL (from `VITE_API_URL` env var). An Axios request interceptor automatically attaches `Authorization: Bearer <token>` from `localStorage` to every outgoing request, so no page needs to handle this manually.

### Data

**`data/sampleResume.js`**
A hardcoded sample resume object. Used to populate the builder when a user creates a new resume, so they see a useful starting point rather than a blank form.

### Styles

**`styles/index.css`**
Global stylesheet. Defines CSS custom properties for the color system (light and dark themes), base typography, layout utilities, and any global resets. All component-level styles are co-located or rely on these tokens.

### Config & Tooling

**`index.html`**
Vite's HTML entry point. Contains the `<div id="root">` mount target and links the favicon.

**`vite.config.js`**
Vite configuration. Sets up the React plugin and any path aliases or proxy rules for local development.

**`eslint.config.js`**
ESLint flat config. Enforces code style and React-specific rules across the frontend.

**`public/robots.txt`**
Tells crawlers which paths to index or skip.

**`public/sitemap.xml`**
Lists the app's public URLs for search engine discovery.

---

*For a high-level overview of the project, see [README.md](./README.md).*
