import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getTodayString } from '../utils/helpers'
import './Nutrition.css'

const DAILY_GOALS = { calories: 2000, protein: 150, carbs: 250, fats: 65 }

export default function Nutrition() {
  const [meals, setMeals] = useLocalStorage('fitstack_nutrition', [])
  const [form, setForm] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' })
  const [showForm, setShowForm] = useState(false)

  const today = getTodayString()
  const todayMeals = meals.filter(m => m.date === today)

  const totals = todayMeals.reduce((acc, m) => ({
    calories: acc.calories + (Number(m.calories) || 0),
    protein:  acc.protein  + (Number(m.protein)  || 0),
    carbs:    acc.carbs    + (Number(m.carbs)    || 0),
    fats:     acc.fats     + (Number(m.fats)     || 0),
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    const meal = { id: uuidv4(), ...form, date: today }
    setMeals(prev => [meal, ...prev])
    setForm({ name: '', calories: '', protein: '', carbs: '', fats: '' })
    setShowForm(false)
  }

  const deleteMeal = (id) => setMeals(prev => prev.filter(m => m.id !== id))

  const pct = (val, goal) => Math.min(Math.round((val / goal) * 100), 100)

  return (
    <div>
      <div className="page-header flex-between">
        <div>
          <h1>Nutrition Tracker</h1>
          <p>Monitor your daily macro intake</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(s => !s)}>
          {showForm ? '✕ Close' : '+ Add Meal'}
        </button>
      </div>

      {/* Macro Summary */}
      <div className="macro-summary card" style={{ marginBottom: 28 }}>
        <h3 className="macro-title">Today's Progress</h3>
        <div className="macro-grid">
          {[
            { key: 'calories', label: 'Calories', unit: 'kcal', color: 'var(--orange)' },
            { key: 'protein',  label: 'Protein',  unit: 'g',    color: 'var(--accent)' },
            { key: 'carbs',    label: 'Carbs',    unit: 'g',    color: 'var(--green)'  },
            { key: 'fats',     label: 'Fats',     unit: 'g',    color: 'var(--yellow)' },
          ].map(({ key, label, unit, color }) => (
            <div key={key} className="macro-item">
              <div className="flex-between" style={{ marginBottom: 6 }}>
                <span className="macro-label">{label}</span>
                <span className="macro-value" style={{ color }}>
                  {totals[key]}<span style={{ color: 'var(--text-muted)', fontSize: 12 }}>/{DAILY_GOALS[key]}{unit}</span>
                </span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${pct(totals[key], DAILY_GOALS[key])}%`, background: color }} />
              </div>
              <p className="macro-pct">{pct(totals[key], DAILY_GOALS[key])}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Meal Form */}
      {showForm && (
        <div className="card" style={{ marginBottom: 28 }}>
          <h3 style={{ marginBottom: 20, fontSize: 16, fontWeight: 700 }}>Log a Meal</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Meal Name *</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Chicken Breast" />
            </div>
            <div className="grid-4">
              <div className="form-group">
                <label className="form-label">Calories</label>
                <input className="form-input" name="calories" type="number" value={form.calories} onChange={handleChange} placeholder="kcal" />
              </div>
              <div className="form-group">
                <label className="form-label">Protein (g)</label>
                <input className="form-input" name="protein" type="number" value={form.protein} onChange={handleChange} placeholder="g" />
              </div>
              <div className="form-group">
                <label className="form-label">Carbs (g)</label>
                <input className="form-input" name="carbs" type="number" value={form.carbs} onChange={handleChange} placeholder="g" />
              </div>
              <div className="form-group">
                <label className="form-label">Fats (g)</label>
                <input className="form-input" name="fats" type="number" value={form.fats} onChange={handleChange} placeholder="g" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Log Meal</button>
          </form>
        </div>
      )}

      {/* Meal List */}
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Today's Meals</h3>
      {todayMeals.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🥗</span>
          <p>No meals logged today. Start tracking!</p>
        </div>
      ) : (
        <div className="meal-list">
          {todayMeals.map(m => (
            <div key={m.id} className="meal-card card">
              <div>
                <p className="meal-name">{m.name}</p>
                <div className="meal-macros">
                  {m.calories && <span className="macro-pill orange">{m.calories} kcal</span>}
                  {m.protein  && <span className="macro-pill purple">{m.protein}g protein</span>}
                  {m.carbs    && <span className="macro-pill green">{m.carbs}g carbs</span>}
                  {m.fats     && <span className="macro-pill yellow">{m.fats}g fats</span>}
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => deleteMeal(m.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
