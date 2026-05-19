import { useWorkout } from '../context/WorkoutContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getTodayString } from '../utils/helpers'
import './Progress.css'

export default function Progress() {
  const { workouts, completedCount } = useWorkout()
  const [goals] = useLocalStorage('fitstack_goals', {})
  const [nutrition] = useLocalStorage('fitstack_nutrition', [])

  const total = workouts.length
  const completionPct = total > 0 ? Math.round((completedCount / total) * 100) : 0

  const today = getTodayString()
  const todayCalories = nutrition
    .filter(m => m.date === today)
    .reduce((s, m) => s + (Number(m.calories) || 0), 0)

  const weightDiff = goals.currentWeight && goals.targetWeight
    ? Math.abs(goals.currentWeight - goals.targetWeight)
    : null
  const weightPct = weightDiff !== null && goals.currentWeight
    ? Math.max(0, Math.round((1 - weightDiff / goals.currentWeight) * 100))
    : 0

  const STATS = [
    { label: 'Total Workouts',    value: total,          unit: '',   color: 'var(--accent)',  icon: '🏋️' },
    { label: 'Completed',         value: completedCount, unit: '',   color: 'var(--green)',   icon: '✅' },
    { label: 'Completion Rate',   value: `${completionPct}%`, unit: '', color: 'var(--orange)', icon: '📊' },
    { label: "Today's Calories",  value: todayCalories,  unit: 'kcal', color: 'var(--yellow)', icon: '🔥' },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Progress</h1>
        <p>Track how far you've come</p>
      </div>

      {/* Stat Row */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {STATS.map(s => (
          <div key={s.label} className="card progress-stat-card">
            <div className="ps-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="ps-value" style={{ color: s.color }}>{s.value}<span className="ps-unit">{s.unit}</span></div>
            <div className="ps-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="grid-2" style={{ marginBottom: 32 }}>
        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Workout Completion</h3>
          <div className="big-progress-ring">
            <svg viewBox="0 0 120 120" width="120" height="120">
              <circle cx="60" cy="60" r="50" stroke="var(--border)" strokeWidth="10" fill="none" />
              <circle
                cx="60" cy="60" r="50"
                stroke="var(--accent)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionPct / 100)}`}
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
              />
            </svg>
            <div className="ring-label">
              <span className="ring-pct">{completionPct}%</span>
              <span className="ring-sub">complete</span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 16, textAlign: 'center' }}>
            {completedCount} of {total} workouts done
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Weight Goal Progress</h3>
          {weightDiff !== null ? (
            <>
              <div className="weight-progress-row">
                <div className="wp-block">
                  <p className="wp-val">{goals.currentWeight} kg</p>
                  <p className="wp-lbl">Current</p>
                </div>
                <div className="wp-arrow">→</div>
                <div className="wp-block">
                  <p className="wp-val" style={{ color: 'var(--accent-light)' }}>{goals.targetWeight} kg</p>
                  <p className="wp-lbl">Target</p>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div className="flex-between" style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Progress toward goal</span>
                  <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>{weightPct}%</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${weightPct}%`, background: 'var(--green)' }} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
                  {weightDiff} kg remaining
                </p>
              </div>
            </>
          ) : (
            <div className="empty-state" style={{ padding: '20px 0' }}>
              <span className="empty-icon">🎯</span>
              <p>Set your weight goals in the Goals page</p>
            </div>
          )}
        </div>
      </div>

      {/* Workout breakdown by category */}
      <div className="card">
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Workout Breakdown by Category</h3>
        {['Chest','Back','Legs','Cardio','Arms'].map(cat => {
          const catWorkouts = workouts.filter(w => w.category === cat)
          const catDone = catWorkouts.filter(w => w.completed).length
          const catPct = catWorkouts.length > 0 ? Math.round((catDone / catWorkouts.length) * 100) : 0
          return (
            <div key={cat} className="cat-row">
              <span className={`badge tag-${cat.toLowerCase()}`}>{cat}</span>
              <div className="cat-bar-wrap">
                <div className="progress-bar-wrap" style={{ flex: 1 }}>
                  <div className="progress-bar-fill" style={{ width: `${catPct}%` }} />
                </div>
                <span className="cat-stat">{catDone}/{catWorkouts.length}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
