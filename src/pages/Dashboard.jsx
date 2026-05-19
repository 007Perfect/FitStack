import { useAuth } from '../context/AuthContext'
import { useWorkout } from '../context/WorkoutContext'
import { useQuote } from '../hooks/useQuote'
import { useLocalStorage } from '../hooks/useLocalStorage'
import StatCard from '../components/StatCard'
import { ClipLoader } from 'react-spinners'
import { getGreeting, calculateBMI, getBMICategory } from '../utils/helpers'
import './Dashboard.css'

export default function Dashboard() {
  const { user } = useAuth()
  const { completedCount, streak, workouts } = useWorkout()
  const { quote, loading: quoteLoading } = useQuote()
  const [water] = useLocalStorage('fitstack_water', { count: 0, goal: 8 })
  const [profile] = useLocalStorage('fitstack_profile', {})
  const [nutrition] = useLocalStorage('fitstack_nutrition', [])

  const bmi = calculateBMI(profile.weight, profile.height)
  const bmiCategory = getBMICategory(bmi)

  // Sum today's calories from nutrition
  const today = new Date().toISOString().split('T')[0]
  const todayMeals = nutrition.filter(m => m.date === today)
  const todayCalories = todayMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0)

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <p className="greeting-tag">{getGreeting()},</p>
          <h1 className="welcome-name">{user?.name?.split(' ')[0]} 👋</h1>
          <p className="welcome-sub">Here's your fitness summary for today.</p>
        </div>
        <div className="welcome-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        <StatCard
          icon="🔥"
          label="Calories Burned"
          value={todayCalories || 0}
          unit="kcal"
          color="var(--orange)"
          sub="Today's intake"
        />
        <StatCard
          icon="⚡"
          label="Workout Streak"
          value={streak}
          unit="days"
          color="var(--accent)"
          sub={`${completedCount} completed`}
        />
        <StatCard
          icon="💧"
          label="Water Intake"
          value={water.count}
          unit={`/ ${water.goal} glasses`}
          color="var(--blue)"
          sub={`${Math.round((water.count / water.goal) * 100)}% of goal`}
        />
        <StatCard
          icon="⚖️"
          label="BMI"
          value={bmi ?? '—'}
          color={bmiCategory.color}
          sub={bmiCategory.label}
        />
      </div>

      {/* Quote & Quick Stats */}
      <div className="dashboard-bottom grid-2">
        {/* Quote Card */}
        <div className="card quote-card">
          <p className="quote-label">💬 Daily Motivation</p>
          {quoteLoading ? (
            <div className="spinner-center"><ClipLoader color="var(--accent)" size={24} /></div>
          ) : quote ? (
            <>
              <p className="quote-text">"{quote.q}"</p>
              <p className="quote-author">— {quote.a}</p>
            </>
          ) : null}
        </div>

        {/* Recent Workouts */}
        <div className="card">
          <div className="flex-between" style={{ marginBottom: 16 }}>
            <h3 className="section-title">Recent Workouts</h3>
            <span className="badge" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)' }}>
              {workouts.length} total
            </span>
          </div>
          {workouts.length === 0 ? (
            <div className="empty-state" style={{ padding: '24px 0' }}>
              <span className="empty-icon">🏋️</span>
              <p>No workouts yet. Add your first one!</p>
            </div>
          ) : (
            <ul className="recent-workout-list">
              {workouts.slice(0, 4).map(w => (
                <li key={w.id} className="recent-workout-item">
                  <span className={`badge tag-${w.category?.toLowerCase()}`}>{w.category}</span>
                  <span className="rw-name">{w.name}</span>
                  <span className={`rw-status ${w.completed ? 'done' : 'pending'}`}>
                    {w.completed ? '✓' : '○'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
