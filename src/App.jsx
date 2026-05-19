import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { WorkoutProvider } from './context/WorkoutContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './components/DashboardLayout'

import Login     from './pages/Login'
import Signup    from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Workouts  from './pages/Workouts'
import Nutrition from './pages/Nutrition'
import Water     from './pages/Water'
import Goals     from './pages/Goals'
import Progress  from './pages/Progress'
import Profile   from './pages/Profile'
import NotFound  from './pages/NotFound'

function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkoutProvider>
          <BrowserRouter>
            <Routes>
              {/* Public */}
              <Route path="/"       element={<Navigate to="/dashboard" replace />} />
              <Route path="/login"  element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected */}
              <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
              <Route path="/workouts"  element={<ProtectedLayout><Workouts /></ProtectedLayout>} />
              <Route path="/nutrition" element={<ProtectedLayout><Nutrition /></ProtectedLayout>} />
              <Route path="/water"     element={<ProtectedLayout><Water /></ProtectedLayout>} />
              <Route path="/goals"     element={<ProtectedLayout><Goals /></ProtectedLayout>} />
              <Route path="/progress"  element={<ProtectedLayout><Progress /></ProtectedLayout>} />
              <Route path="/profile"   element={<ProtectedLayout><Profile /></ProtectedLayout>} />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WorkoutProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
