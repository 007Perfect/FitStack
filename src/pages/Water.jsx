import { useLocalStorage } from '../hooks/useLocalStorage'
import { clamp } from '../utils/helpers'
import './Water.css'

export default function Water() {
  const [water, setWater] = useLocalStorage('fitstack_water', { count: 0, goal: 8 })

  const increment = () => setWater(prev => ({ ...prev, count: prev.count + 1 }))
  const decrement = () => setWater(prev => ({ ...prev, count: clamp(prev.count - 1, 0, 99) }))
  const reset     = () => setWater(prev => ({ ...prev, count: 0 }))
  const changeGoal = (e) => setWater(prev => ({ ...prev, goal: Number(e.target.value) }))

  const pct = Math.min(Math.round((water.count / water.goal) * 100), 100)

  return (
    <div>
      <div className="page-header">
        <h1>Water Intake</h1>
        <p>Stay hydrated — aim for your daily goal</p>
      </div>

      <div className="water-layout">
        {/* Main counter */}
        <div className="card water-main-card">
          <div className="water-circle-wrap">
            <div className="water-circle" style={{ '--fill': pct }}>
              <div className="water-circle-inner">
                <span className="water-count">{water.count}</span>
                <span className="water-glasses">glasses</span>
              </div>
              <svg className="water-ring" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="68" stroke="var(--border)" strokeWidth="10" fill="none" />
                <circle
                  cx="80" cy="80" r="68"
                  stroke="var(--blue)"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 68}`}
                  strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
            </div>
          </div>

          <div className="water-pct-label">{pct}% of daily goal</div>

          <div className="water-controls">
            <button className="water-btn minus" onClick={decrement}>−</button>
            <button className="water-btn plus" onClick={increment}>+ Glass</button>
          </div>

          <button className="btn btn-ghost" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} onClick={reset}>
            Reset Day
          </button>
        </div>

        {/* Goal & Info */}
        <div className="water-right">
          <div className="card">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Daily Goal</h3>
            <div className="form-group">
              <label className="form-label">Target glasses per day</label>
              <select className="form-select" value={water.goal} onChange={changeGoal}>
                {[6, 7, 8, 9, 10, 12].map(n => (
                  <option key={n} value={n}>{n} glasses</option>
                ))}
              </select>
            </div>
            <div className="progress-bar-wrap" style={{ marginTop: 8 }}>
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: 'var(--blue)' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
              {water.count} / {water.goal} glasses consumed
            </p>
          </div>

          <div className="card water-tips">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>💡 Hydration Tips</h3>
            <ul className="tips-list">
              <li>Drink a glass first thing in the morning</li>
              <li>Set reminders every 2 hours</li>
              <li>Drink extra on workout days</li>
              <li>Carry a water bottle with you</li>
              <li>Eat water-rich foods like cucumber & watermelon</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
