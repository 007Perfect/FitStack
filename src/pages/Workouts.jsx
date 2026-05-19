import { useState } from 'react'
import { useWorkout } from '../context/WorkoutContext'
import './Workouts.css'

const CATEGORIES = ['Chest', 'Back', 'Legs', 'Cardio', 'Arms']

export default function Workouts() {
  const { workouts, addWorkout, deleteWorkout, toggleWorkout } = useWorkout()
  const [form, setForm] = useState({ name: '', category: 'Chest', sets: '', reps: '', duration: '' })
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    addWorkout(form)
    setForm({ name: '', category: 'Chest', sets: '', reps: '', duration: '' })
    setShowForm(false)
  }

  const filtered = filter === 'All' ? workouts : workouts.filter(w => w.category === filter)
  const allFilters = ['All', ...CATEGORIES]

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>Workout Planner</h1>
          <p>Plan, track and crush your workouts</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Close' : '+ Add Workout'}
        </button>
      </div>

      {/* Add Workout Form */}
      {showForm && (
        <div className="card workout-form-card">
          <h3 style={{ marginBottom: 20, fontSize: 16, fontWeight: 700 }}>New Workout</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Exercise Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Bench Press" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Sets</label>
                <input className="form-input" name="sets" value={form.sets} onChange={handleChange} placeholder="e.g. 4" type="number" min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">Reps</label>
                <input className="form-input" name="reps" value={form.reps} onChange={handleChange} placeholder="e.g. 12" type="number" min="1" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Duration (mins)</label>
              <input className="form-input" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 45" type="number" min="1" style={{ maxWidth: 200 }} />
            </div>
            <button type="submit" className="btn btn-primary">Add Workout</button>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="workout-filters">
        {allFilters.map(f => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Workout List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏋️</span>
          <p>No workouts here. Add your first one!</p>
        </div>
      ) : (
        <div className="workout-list">
          {filtered.map(w => (
            <div key={w.id} className={`workout-card card ${w.completed ? 'completed' : ''}`}>
              <div className="workout-card-left">
                <button className="check-btn" onClick={() => toggleWorkout(w.id)}>
                  {w.completed ? '✅' : '⬜'}
                </button>
                <div>
                  <div className="workout-name">{w.name}</div>
                  <div className="workout-meta">
                    <span className={`badge tag-${w.category?.toLowerCase()}`}>{w.category}</span>
                    {w.sets && <span className="meta-chip">💪 {w.sets} sets</span>}
                    {w.reps && <span className="meta-chip">🔁 {w.reps} reps</span>}
                    {w.duration && <span className="meta-chip">⏱ {w.duration} min</span>}
                  </div>
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => deleteWorkout(w.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
