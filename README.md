# PassFGT

A sleek and secure Password Manager Web App built with the MERN stack, featuring CRUD functionality, password masking, copy-to-clipboard, search & filter, and cloud deployment.

🌐 Live Demo: PassFGT on Render

# Overview

PassFGT is a full-stack password manager that lets users store, manage, and retrieve their credentials with ease.
It is designed with simplicity, responsiveness, and security in mind — all in a minimal and modern UI.

# Features

🔐 Add, Update, Delete Passwords with instant database sync

👀 Masked Passwords (hidden by default, but copyable)

📋 One-click Copy username or password with clipboard support

🔎 Search & Filter passwords by website or username

🎨 Responsive UI with TailwindCSS (works on mobile & desktop)

⚡ Notifications with React Toastify for smooth UX

☁️ Deployed on Render (frontend + backend + MongoDB Atlas)

# Tech Stack
Frontend

⚛️ React (with Hooks)

🎨 TailwindCSS

🔔 React-Toastify

🌐 Fetch API

Backend

🟢 Node.js + Express

🍃 MongoDB Atlas (cloud database)

🔑 CRUD API (/api/passwords)

⚙️ Installation & Setup

Clone the repo

git clone https://github.com/your-username/PassFGT.git
cd PassFGT


Install dependencies

# Frontend
npm install

# Backend
cd ../server
npm install


Set environment variables
In your server/.env file:

MONGO_URI=your_mongodb_connection_string
PORT=3000


Run locally

# Start backend
node server.js

# Start frontend
npm run dev

📂 Project Structure
PassFGT/
│───── src/ # React Frontend
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
├── server/        # Express Backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md

🚀 Deployment

Frontend: React app hosted on Render

Backend: Express API hosted on Render

Database: MongoDB Atlas


👨‍💻 Author

Annsh Kumar Singh

🔥 With PassFGT, managing your passwords just got faster, simpler, and safer.
