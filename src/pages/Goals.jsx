import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import './Goals.css'

const CHALLENGES = [
  { id: 1, title: '30-Day Push-Up', desc: 'Do 50 push-ups every day for 30 days.', icon: '💪', color: 'var(--accent)' },
  { id: 2, title: 'Hydration Hero', desc: 'Hit your water goal for 7 days straight.', icon: '💧', color: 'var(--blue)' },
  { id: 3, title: 'Morning Warrior', desc: 'Workout before 8am for 5 days this week.', icon: '🌅', color: 'var(--orange)' },
  { id: 4, title: 'No Sugar Week', desc: 'Avoid added sugars for 7 days.', icon: '🍬', color: 'var(--green)' },
  { id: 5, title: '10K Steps', desc: 'Walk 10,000 steps every day this week.', icon: '👟', color: 'var(--yellow)' },
  { id: 6, title: 'Plank Every Day', desc: 'Hold a plank for 2 minutes daily for 14 days.', icon: '🧘', color: 'var(--pink)' },
]

export default function Goals() {
  const [goals, setGoals] = useLocalStorage('fitstack_goals', {
    targetWeight: '', currentWeight: '', weeklyWorkouts: '', notes: ''
  })
  const [accepted, setAccepted] = useLocalStorage('fitstack_challenges', [])
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => setGoals(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const toggleChallenge = (id) => {
    setAccepted(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <div className="page-header">
        <h1>Fitness Goals</h1>
        <p>Set your targets and take on weekly challenges</p>
      </div>

      <div className="goals-layout">
        {/* Goals Form */}
        <div className="card goals-form-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>🎯 My Goals</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Target Weight (kg)</label>
              <input className="form-input" name="targetWeight" value={goals.targetWeight} onChange={handleChange} placeholder="e.g. 75" type="number" />
            </div>
            <div className="form-group">
              <label className="form-label">Current Weight (kg)</label>
              <input className="form-input" name="currentWeight" value={goals.currentWeight} onChange={handleChange} placeholder="e.g. 82" type="number" />
            </div>
            <div className="form-group">
              <label className="form-label">Weekly Workout Target (days)</label>
              <select className="form-select" name="weeklyWorkouts" value={goals.weeklyWorkouts} onChange={handleChange}>
                <option value="">Select target</option>
                {[2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} days/week</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Notes / Motivation</label>
              <textarea
                className="form-input"
                name="notes"
                value={goals.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Write what keeps you going..."
                style={{ resize: 'vertical' }}
              />
            </div>

            {goals.targetWeight && goals.currentWeight && (
              <div className="goal-diff-card">
                <span>Weight to goal:</span>
                <span className="goal-diff-val" style={{ color: goals.currentWeight > goals.targetWeight ? 'var(--orange)' : 'var(--green)' }}>
                  {Math.abs(goals.currentWeight - goals.targetWeight)} kg to {goals.currentWeight > goals.targetWeight ? 'lose' : 'gain'}
                </span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
              {saved ? '✓ Saved!' : 'Save Goals'}
            </button>
          </form>
        </div>

        {/* Challenges */}
        <div className="challenges-section">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🏆 Weekly Challenges</h3>
          <div className="challenges-grid">
            {CHALLENGES.map(ch => (
              <div key={ch.id} className={`challenge-card card ${accepted.includes(ch.id) ? 'accepted' : ''}`}>
                <div className="challenge-icon" style={{ color: ch.color }}>{ch.icon}</div>
                <div className="challenge-body">
                  <p className="challenge-title">{ch.title}</p>
                  <p className="challenge-desc">{ch.desc}</p>
                </div>
                <button
                  className={`challenge-btn ${accepted.includes(ch.id) ? 'accepted' : ''}`}
                  onClick={() => toggleChallenge(ch.id)}
                >
                  {accepted.includes(ch.id) ? '✓ Accepted' : 'Accept'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
