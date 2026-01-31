# Resumex 📄

**Resumex** is a modern, full-stack Resume Builder application designed to help users create professional, ATS-friendly resumes with ease. It features a real-time preview, multiple templates, and secure user authentication.

---

## 🚀 Features

-   **Real-time Resume Builder**: See changes instantly as you type.
-   **Multiple Templates**: Choose from Classic, Modern, and Minimal designs.
-   **User Authentication**: Secure Login/Register functionality.
-   **Dashboard**: Manage multiple resumes from a central dashboard.
-   **PDF Export**: Download your high-quality resume as a PDF.
-   **Admin Panel**: Administrative capabilities to manage users and view system stats.
-   **Responsive Design**: Works seamlessly on desktop and mobile devices.

---

## 🛠️ Tech Stack

### **Frontend**
-   **React** (Vite): Fast and modern UI library.
-   **Context API**: Global state management for Auth and Resume data.
-   **React Router**: Client-side routing.
-   **Axios**: API communication.
-   **CSS Variables**: Flexible and maintainable styling system.
-   **HTML2PDF.js**: For generating PDF downloads.

### **Backend**
-   **Node.js & Express**: Robust server-side framework.
-   **MongoDB & Mongoose**: NoSQL database for flexible data storage.
-   **JWT (JSON Web Tokens)**: Secure stateless authentication.
-   **Bcrypt.js**: Password hashing.

---

## ⚙️ Prerequisites

Before running this project, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

---

## 📥 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <repository_url>
    cd Resumex
    ```

### **Backend Setup**

2.  **Navigate to the backend directory**
    ```bash
    cd backend
    ```

3.  **Install Dependencies**
    ```bash
    npm install
    ```

4.  **Configure Environment Variables**
    Create a `.env` file in the `backend` folder and add the following:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/resumex  # Or your MongoDB Atlas URI
    JWT_SECRET=your_super_secret_jwt_key
    ```

5.  **Start the Server**
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:3000`.

### **Frontend Setup**

6.  **Navigate to the frontend directory** (Open a new terminal)
    ```bash
    cd ../frontend
    ```

7.  **Install Dependencies**
    ```bash
    npm install
    ```

8.  **Start the Development Server**
    ```bash
    npm run dev
    ```
    The frontend will run on `http://localhost:5173` (or the port shown in terminal).

---

## 📖 Usage

1.  Open your browser and navigate to the frontend URL (usually `http://localhost:5173`).
2.  **Register** a new account.
3.  Go to the **Dashboard** and click **Create New Resume**.
4.  Fill in your details (Education, Experience, Skills) in the editor form.
5.  Watch the **Live Preview** update in real-time.
6.  Click **Download PDF** to save your resume.

---

## 📂 Project Structure

For a detailed breakdown of the file structure and purpose, please see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

```
Resumex/
├── backend/            # Express Server & Database Logic
│   ├── src/
│   │   ├── config/     # DB Connection
│   │   ├── controllers/# Business Logic
│   │   ├── middleware/ # Auth & Security
│   │   ├── models/     # Mongoose Schemas
│   │   └── routes/     # API Endpoints
│
├── frontend/           # React Client Application
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── context/    # Global State (Auth)
│   │   ├── pages/      # Application Views
│   │   ├── services/   # API Integration
│   │   └── templates/  # Resume Design Templates
│
└── PROJECT_STRUCTURE.md # Detailed Architecture Documentation
```

---

## 🛡️ License

This project is open-source and available under the [MIT License](LICENSE).
