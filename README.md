# EduSphere
EduSphere is a full-stack web-based learning management system built using React-Node-SQL stack. It provides a platform for students to enroll in courses and track their learning progress, while instructors can manage content, monitor student activity, and engage learners through multimedia lessons and interactive assessments.

## Features

- 👨‍🏫 Instructor dashboard to create and manage courses
- 🎓 Student dashboard for tracking enrolled courses and progress
- 📺 Video playback with resume functionality
- 📝 Course content structured into chapters
- 🔐 JWT-based secure authentication system
- 💾 Persistent user data using MongoDB
- 📊 Progress tracking stored and synced with backend

## Technologies Used

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- SQL
- JSON Web Token (JWT)
- bcrypt.js

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js & npm
- SQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Suvasies-Rocks/FYP
   cd edusphere
   ```

2. **Set up backend:**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory with the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Run backend server:**
   ```bash
   npm run dev
   ```

4. **Set up frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

The frontend will run on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Folder Structure

```
edusphere/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md
```


