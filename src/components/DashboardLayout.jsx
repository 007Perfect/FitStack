import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import './DashboardLayout.css'

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/workouts':  'Workout Planner',
  '/nutrition': 'Nutrition Tracker',
  '/water':     'Water Intake',
  '/goals':     'Fitness Goals',
  '/progress':  'Progress',
  '/profile':   'Profile',
}

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] || 'FitStack'

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="layout-main">
        <Navbar title={title} onMenuToggle={() => setSidebarOpen(o => !o)} />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}
