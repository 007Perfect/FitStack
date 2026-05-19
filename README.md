# ⚡ FitStack — Your Fitness Operating System

A modern, full-featured Fitness Dashboard built with **ReactJS + Vite**.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

### 3. Open in browser
```
http://localhost:5173
```

---

## 🏗️ Tech Stack
- **ReactJS 18** + **Vite 5**
- **React Router v6** — client-side routing
- **Context API** — global state (Auth, Workouts, Theme)
- **React Hooks** — useState, useEffect, useContext, custom hooks
- **react-spinners** — loading states
- **uuid** — unique IDs for workouts & meals
- **CSS Variables** — consistent theming

---

## 📂 Folder Structure
```
src/
 ├── components/       # Reusable UI components
 │   ├── DashboardLayout.jsx
 │   ├── Navbar.jsx
 │   ├── Sidebar.jsx
 │   └── StatCard.jsx
 ├── context/          # Global Context providers
 │   ├── AuthContext.jsx
 │   ├── WorkoutContext.jsx
 │   └── ThemeContext.jsx
 ├── hooks/            # Custom React hooks
 │   ├── useLocalStorage.js
 │   └── useQuote.js
 ├── pages/            # Page components
 │   ├── Login.jsx
 │   ├── Signup.jsx
 │   ├── Dashboard.jsx
 │   ├── Workouts.jsx
 │   ├── Nutrition.jsx
 │   ├── Water.jsx
 │   ├── Goals.jsx
 │   ├── Progress.jsx
 │   ├── Profile.jsx
 │   └── NotFound.jsx
 ├── routes/
 │   └── ProtectedRoute.jsx
 ├── utils/
 │   └── helpers.js
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ✨ Features

| Feature               | Details                                    |
|-----------------------|--------------------------------------------|
| 🔐 Auth               | Signup/Login with fake JWT in localStorage |
| 🛡️ Protected Routes   | Unauthenticated users → redirected to /login |
| ⚡ Dashboard           | Summary cards, quote API, recent workouts  |
| 🏋️ Workout Planner    | Add / delete / toggle, filter by category  |
| 🥗 Nutrition Tracker  | Log meals, macros, daily progress bars     |
| 💧 Water Tracker      | SVG ring progress, adjustable daily goal   |
| 🎯 Goals              | Weight goals, weekly challenges            |
| 📈 Progress           | Completion rings, category breakdown       |
| 👤 Profile            | Edit profile, BMI calculation, goal summary |
| 🌙 Dark/Light Theme   | Toggle via sidebar, persisted in localStorage |
| 📱 Responsive         | Works on mobile, tablet, and desktop       |

---

## 🔑 How Auth Works
1. **Sign up** — stores user in `localStorage` under `fitstack_users`
2. **Login** — validates credentials, stores a fake base64 JWT token
3. **Protected routes** — check for token, redirect if missing
4. **Logout** — clears token and user from localStorage

---

## 🌐 API Used
- **ZenQuotes API** (`https://zenquotes.io/api/random`) — daily motivational quote  
  Falls back to built-in quotes if the API is unavailable (CORS or network issues).

---

## 📦 Build for Production
```bash
npm run build
npm run preview
```
