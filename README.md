# CoursePilot — Bow Course Registration System

A full-stack web application built for the Software Development department at Bow Valley College, letting students browse programs and register for courses, and letting admins manage course offerings and student records.

## Overview

CoursePilot replaces manual course registration with a self-service web app:

- **Students** can view available programs and courses, and register for courses based on their selected program and term.
- **Admins** can manage the course catalog and view student registration details.
- **Guests** can browse available programs before creating an account.

## Tech Stack

**Frontend** (`course-pilot/`)
- React 19
- React Router for client-side routing across Guest / Student / Admin page trees
- Redux for state management
- Axios for API calls
- React Icons

**Backend** (`server/`)
- Node.js + Express 5
- MSSQL (`mssql` package) for the database layer
- JWT (`jsonwebtoken`) for authentication
- bcrypt for password hashing
- Cookie-based session handling (`cookie-parser`)

## Architecture

```
course-pilot/          → React frontend
  src/pages/Guest/      → Public/unauthenticated pages
  src/pages/Student/     → Student-only pages (registration, course browsing)
  src/pages/Admin/       → Admin-only pages (course & student management)
  src/pages/Common/       → Shared pages/components
  src/context/UserContext.jsx → Auth state shared across the app

server/                → Express backend
  routes/               → userRoutes.js, courseRoutes.js
  controllers/          → Request handling logic
  models/               → userModels.js, courseModels.js — MSSQL queries
  config/                → db.js (MSSQL connection pool), config.js (env config)
  middleware/            → Auth/request middleware
```

The frontend and backend are separate npm projects that run concurrently during development.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ShadeKnightly/CoursePilot.git
cd CoursePilot
```

### 2. Install dependencies
```bash
npm install --prefix server
npm install --prefix course-pilot
```

### 3. Configure environment variables
Create a `.env` file inside `server/` with:
```
PORT=5000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_SERVER=your_sql_server_address
DB_DATABASE=your_database_name
```

### 4. Run the app
From the project root:
```bash
npm start
```
This runs the backend (`nodemon server.js` on the configured `PORT`) and the frontend (`react-scripts start`) concurrently.

Alternatively, run each independently:
```bash
# backend
npm run dev --prefix server

# frontend
npm start --prefix course-pilot
```

### 5. Open the app
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

- Requires Node.js and access to a Microsoft SQL Server instance.
- The backend connects to SQL Server via a connection pool (`mssql`) configured in `server/config/db.js`.
