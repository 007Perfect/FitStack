import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Sidebar.css'

const NAV_ITEMS = [
  { to: '/dashboard',  icon: '⚡', label: 'Dashboard'  },
  { to: '/workouts',   icon: '🏋️', label: 'Workouts'   },
  { to: '/nutrition',  icon: '🥗', label: 'Nutrition'  },
  { to: '/water',      icon: '💧', label: 'Water'      },
  { to: '/goals',      icon: '🎯', label: 'Goals'      },
  { to: '/progress',   icon: '📈', label: 'Progress'   },
  { to: '/profile',    icon: '👤', label: 'Profile'    },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">FitStack</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="sidebar-theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <div className="sidebar-user">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  )
}
