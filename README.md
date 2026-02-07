# Resumex

**Resumex** is a modern, full-stack application for creating professional, ATS-friendly resumes in minutes.

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Framework-Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)

## Features
- Real-time editor with instant preview.
- Multiple templates (Classic, Modern, Minimal).
- Secure user accounts with JWT authentication.
- PDF export and dashboard management.

## Quick Start

1. **Clone**
   ```bash
   git clone https://github.com/v9mirza/Resumex
   cd Resumex
   ```

2. **Backend**
   ```bash
   cd backend && npm install
   # Create .env (example)
   echo "PORT=3000\nMONGO_URI=mongodb://localhost:27017/resumex\nJWT_SECRET=secret" > .env
   npm start
   ```

3. **Frontend**
   ```bash
   cd frontend && npm install && npm run dev
   ```

## Structure
See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for architecture details.

---
Made by [v9mirza](https://v9mirza.com/) | MIT License
