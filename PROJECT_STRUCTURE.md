# Project Architecture & File Documentation

This document explains the structure of the **Resumex** application, detailing the purpose of every file in the Backend and Frontend.

## 🟢 Backend (`/backend/src`)
The backend is a Node.js & Express application that handles the database, authentication, and API logic.

### **Core**
- **`index.js`**:
  - **Purpose**: The entry point of the server.
  - **Function**: It starts the Express app, connects to the database, sets up middleware (CORS, JSON parsing), and defines the main API routes (`/api/auth`, `/api/resumes`, `/api/admin`). It listens on port 3000.

### **Config**
- **`config/db.js`**:
  - **Purpose**: Database configuration.
  - **Function**: Connects to the MongoDB database using Mongoose.

### **Models (Database Schemas)**
- **`models/User.js`**:
  - **Purpose**: Defines the structure of a User account.
  - **Fields**: `email`, `password` (hashed), `role` ('user' or 'admin'), timestamps.
- **`models/Resume.js`**:
  - **Purpose**: Defines the structure of a Resume.
  - **Fields**: `user` (linked to User model), `title`, `data` (the big JSON object containing resume content like education, skills, etc.).

### **Middleware**
- **`middleware/authMiddleware.js`**:
  - **Purpose**: Security guard.
  - **Function**:
    - `protect`: Checks if the request has a valid JWT token. If yes, it attaches the User to the request; if no, it blocks access.
    - `admin`: Checks if the authenticated user has the `role: 'admin'`.

### **Routes (API Definitions)**
- **`routes/auth.js`**:
  - **Purpose**: Endpoints for Account management.
  - **Function**: Handles POST `/register`, POST `/login`, and PUT/DELETE `/profile`.
- **`routes/resumes.js`**:
  - **Purpose**: Endpoints for Resume management.
  - **Function**: Handles GET/POST/PUT/DELETE for resumes. Uses `protect` middleware to ensure you only touch *your* resumes (unless Admin).
- **`routes/adminRoutes.js`**:
  - **Purpose**: Endpoints for Admin capabilities.
  - **Function**: Secure routes for getting system stats, listing all users, and listing all resumes.

### **Controllers (Business Logic)**
- **`controllers/authController.js`**:
  - **Purpose**: Logic for Auth routes.
  - **Function**: Hashes passwords, checks credentials, generates tokens (`registerUser`, `loginUser`, `updateUserProfile`, `deleteAccount`).
- **`controllers/resumeController.js`**:
  - **Purpose**: Logic for Resume routes.
  - **Function**: Creates, reads, updates, and deletes resumes in the database (`getResumes`, `getResumeById`, `createResume`, `updateResume`, `deleteResume`).
- **`controllers/adminController.js`**:
  - **Purpose**: Logic for Admin routes.
  - **Function**: Calculates stats (`getStats`), fetches all data (`getUsers`, `getResumes`), and can delete users (`deleteUser`).

---

## 🔵 Frontend (`/frontend/src`)
The frontend is a React application (using Vite) that provides the user interface.

### **Core & Application Structure**
- **`main.jsx`**:
  - **Purpose**: React Entry point.
  - **Function**: Mounts the React app into the HTML `root` element.
- **`app/App.jsx`**:
  - **Purpose**: Main Application Component.
  - **Function**: Defines the **Routing** (which page shows for which URL) and wraps the app in Global Providers (`AuthProvider`, `ResumeProvider`, `Toaster`). It handles `ProtectedRoute` logic.

### **Services & Global State**
- **`services/api.js`**:
  - **Purpose**: Communication Layer.
  - **Function**: Configures `axios` to make HTTP requests to the Backend. It automatically attaches the JWT token to every request so you don't have to manually send it every time.
- **`context/AuthContext.jsx`**:
  - **Purpose**: User Session State.
  - **Function**: Keeps track of "Who is logged in?". It loads the user from LocalStorage on startup and provides `login`, `register`, and `logout` functions to the rest of the app.
- **`state/useResume.jsx`**:
  - **Purpose**: Resume Editor State.
  - **Function**: A generic state manager for the Resume Builder. It holds the current resume data (`basics`, `education`, `experience`, etc.) so different parts of the builder can read/write to it.

### **Pages (Views)**
- **`pages/Home.jsx`**:
  - **Purpose**: Landing Page.
  - **Function**: The public marketing page. Shows "Login/Dashboard" buttons dynamically based on auth status.
- **`pages/Login.jsx` & `pages/Register.jsx`**:
  - **Purpose**: Authentication Pages.
  - **Function**: Forms to sign in or sign up. They call `AuthContext` methods.
- **`pages/Dashboard.jsx`**:
  - **Purpose**: User's Home Base.
  - **Function**: Lists all your created resumes. Allows Creating, Editing, and Deleting resumes.
- **`pages/Profile.jsx`**:
  - **Purpose**: User Settings.
  - **Function**: Allows updating password, viewing role, and deleting the account.
- **`pages/Builder.jsx`**:
  - **Purpose**: The core application feature.
  - **Function**: The split-screen editor. It loads the `Editor` (forms) on one side and `LivePreview` (resume render) on the other. It handles **saving** data to the backend.
- **`pages/Preview.jsx`**:
  - **Purpose**: Print View.
  - **Function**: A dedicated page for viewing the resume in full screen, usually used for downloading the PDF.
- **`pages/Admin.jsx`**:
  - **Purpose**: Admin Dashboard.
  - **Function**: A special protected page for Admins to view stats, manage users, and inspect all resumes.

### **Components & Templates**
- **`components/editor/`**: Contains the form inputs for each section (e.g., `Education.jsx`, `Experience.jsx`).
- **`components/preview/LivePreview.jsx`**:
  - **Purpose**: The Resume Renderer.
  - **Function**: Takes the raw resume data and decides which Template to render.
- **`templates/`** (`Classic.jsx`, `Modern.jsx`, `Minimal.jsx`):
  - **Purpose**: Visual Designs.
  - **Function**: Check the `resume.meta.template` setting and render the HTML/CSS for that specific look.
- **`styles/index.css`**:
  - **Purpose**: Global Styles.
  - **Function**: Defines CSS variables (colors, fonts) and utility classes used throughout the app.
