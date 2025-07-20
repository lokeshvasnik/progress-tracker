# 🚀 CodeUp - Track. Improve. Conquer.

**CodeUp** is a personal daily progress tracking web application built to help developers, students, and self-learners stay consistent and motivated throughout their self-improvement journeys.

Whether you're doing a "30 Days of Code" challenge or simply want to track your learning and growth — CodeUp empowers you to reflect, visualize, and conquer.

---

## ✅ Product Overview

- **Name:** CodeUp  
- **Tagline:** _"Track. Improve. Conquer."_  
- **Description:**  
  CodeUp provides a personal dashboard for tracking daily learning, journaling reflections, and monitoring productivity. It helps users stay accountable with visual graphs, streak tracking, and motivational nudges.

---

## 🎯 Goals & Objectives

- Motivate users through visual progress  
- Centralize challenge/task tracking  
- Provide daily check-ins for accountability  
- Display streaks and completion percentage  
- Make habit-building fun and rewarding

---

## 👤 Target Audience

- Developers doing daily coding challenges  
- Students preparing for interviews (DSA, system design)  
- Creators building projects or portfolios  
- Anyone pursuing self-growth and consistency

---

## 🔐 Key Features

### 🔑 Authentication
- Firebase Auth (Email/Password + Google)
- Forgot/reset password flow

### 📊 Dashboard
- Personalized greeting (e.g., "Welcome back, Username!")
- Challenge day counter (e.g., *Day 12 of 30*)
- Dynamic motivational quote
- Add progress form with category, mood & description
- Recharts-based progress line graph
- % Challenge Completion + Productivity graph
- Daily Streak Tracker

### 📒 Journal View
- Past entries listed in timeline/card format
- Markdown-supported description
- Edit/Delete functionality

### 🏆 Achievements
- Streak badges (7-day, 15-day, etc.)
- Confetti animation on submission
- Optional productivity rating

### 💡 UI/UX
- Clean, minimal, and elegant UI (Tailwind CSS)
- Framer Motion animations
- Dark/Light mode toggle
- Fully responsive on mobile and desktop

---

## ⚙️ Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Frontend   | React.js + Tailwind CSS     |
| Backend    | Node.js + Express.js        |
| Database   | MongoDB Atlas + Mongoose    |
| Auth       | Firebase Authentication     |
| Graphs     | Recharts                    |
| Hosting    | Vercel (frontend) + Render (backend) |

---

## 🧠 Business Logic Overview

### Problem
Most people lose momentum during personal development challenges due to lack of visible progress or motivation.

### Solution
CodeUp offers a dashboard that reflects daily efforts visually. It rewards streaks, logs progress, and encourages daily wins — making habit-building enjoyable.

### Unique Selling Points
- Developer-focused, not generic  
- Lightweight & fast UI  
- Visual + emotional feedback (charts + motivational quotes)  
- Simple, extensible, and fun to use

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/codeup.git

# Frontend Setup
cd client
npm install
npm run dev

# Backend Setup
cd ../backend
npm install
npm start

# Environment Variables
# Create a .env file in backend folder:
MONGO_URI=<Your MongoDB Atlas URI>
PORT=5000

# Firebase setup in client/firebase.js
