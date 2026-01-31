<div align="center">

# Resumex
### Build Your Professional Future

**Resumex** is a modern, full-stack application that empowers users to create ATS-friendly, professional resumes in minutes. Feature-rich, secure, and designed for simplicity.

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Framework-Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## Key Features

- **Real-time Editor**: See your changes instantly as you type.
- **Multiple Templates**: Choose from Classic, Modern, and Minimal designs.
- **Secure Accounts**: Full user authentication with JWT.
- **Dashboard**: Manage, edit, and delete multiple resumes.
- **PDF Export**: One-click download in high quality.
- **Admin Panel**: User management and system statistics.

---

## Quick Start 🚀

### 1. Clone the Repository
```bash
git clone https://github.com/v9mirza/Resumex
cd Resumex
```

### 2. Backend Setup
Configure and start the server.
```bash
cd backend
npm install

# Create .env file
echo "PORT=3000
MONGO_URI=mongodb://localhost:27017/resumex
JWT_SECRET=your_super_secret_jwt_key" > .env

npm start
```
*Server runs on `http://localhost:3000`*

### 3. Frontend Setup
Launch the user interface.
```bash
# Open a new terminal
cd frontend
npm install
npm run dev
```
*App runs on `http://localhost:5173`*

---

## Project Structure

For a deep dive into the architecture, check out [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

| Directory | Purpose |
| :--- | :--- |
| **`/backend`** | Express API, Database Models, Auth Logic |
| **`/frontend`** | React App, UI Components, Resume Templates |

---

## Tech Stack Listing

**Frontend**: React (Vite), Context API, Axios, CSS Variables, HTML2PDF.js  
**Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.js

---

<div align="center">
  <p>Made by the Resumex Team</p>
  <p>Licensed under MIT</p>
</div>
