import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { calculateBMI, getBMICategory } from '../utils/helpers'
import './Profile.css'

const FITNESS_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Athlete']

export default function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useLocalStorage('fitstack_profile', {
    height: '', weight: '', age: '', gender: '', fitnessLevel: 'Beginner', bio: ''
  })
  const [goals] = useLocalStorage('fitstack_goals', {})
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)

  const handleChange = (e) => setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 2000)
  }

  const bmi = calculateBMI(profile.weight, profile.height)
  const bmiCat = getBMICategory(bmi)

  return (
    <div>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Your fitness identity</p>
      </div>

      <div className="profile-layout">
        {/* Profile Card */}
        <div className="card profile-hero-card">
          <div className="profile-avatar-big">{user?.name?.[0]?.toUpperCase()}</div>
          <h2 className="profile-username">{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
          <span className="badge" style={{ background: 'var(--accent-glow)', color: 'var(--accent-light)', margin: '8px 0' }}>
            {profile.fitnessLevel}
          </span>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}
          <div className="profile-stats-row">
            <div className="profile-stat">
              <span className="ps2-val">{profile.height || '—'}</span>
              <span className="ps2-lbl">cm</span>
            </div>
            <div className="profile-stat-div" />
            <div className="profile-stat">
              <span className="ps2-val">{profile.weight || '—'}</span>
              <span className="ps2-lbl">kg</span>
            </div>
            <div className="profile-stat-div" />
            <div className="profile-stat">
              <span className="ps2-val">{profile.age || '—'}</span>
              <span className="ps2-lbl">yrs</span>
            </div>
          </div>
          {bmi && (
            <div className="bmi-display" style={{ borderColor: bmiCat.color }}>
              <span className="bmi-val" style={{ color: bmiCat.color }}>{bmi}</span>
              <span className="bmi-lbl">{bmiCat.label} BMI</span>
            </div>
          )}
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={() => setEditing(e => !e)}>
            {editing ? '✕ Cancel Edit' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Edit Form + Goal Summary */}
        <div className="profile-right">
          {editing && (
            <div className="card" style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Edit Profile</h3>
              <form onSubmit={handleSave}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Height (cm)</label>
                    <input className="form-input" name="height" value={profile.height} onChange={handleChange} type="number" placeholder="e.g. 175" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input className="form-input" name="weight" value={profile.weight} onChange={handleChange} type="number" placeholder="e.g. 72" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input className="form-input" name="age" value={profile.age} onChange={handleChange} type="number" placeholder="e.g. 25" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select className="form-select" name="gender" value={profile.gender} onChange={handleChange}>
                      <option value="">Prefer not to say</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Fitness Level</label>
                  <select className="form-select" name="fitnessLevel" value={profile.fitnessLevel} onChange={handleChange}>
                    {FITNESS_LEVELS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Bio</label>
                  <textarea className="form-input" name="bio" value={profile.bio} onChange={handleChange} rows={2} placeholder="A short fitness bio..." style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary">
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </form>
            </div>
          )}

          {/* Goal Summary */}
          <div className="card">
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📋 Goal Summary</h3>
            <div className="goal-summary-grid">
              {[
                { label: 'Target Weight', value: goals.targetWeight ? `${goals.targetWeight} kg` : '—' },
                { label: 'Current Weight', value: goals.currentWeight ? `${goals.currentWeight} kg` : '—' },
                { label: 'Weekly Target', value: goals.weeklyWorkouts ? `${goals.weeklyWorkouts} days/week` : '—' },
                { label: 'BMI Status', value: bmi ? `${bmi} (${bmiCat.label})` : '—' },
              ].map(item => (
                <div key={item.label} className="goal-summary-item">
                  <p className="gs-label">{item.label}</p>
                  <p className="gs-value">{item.value}</p>
                </div>
              ))}
            </div>
            {goals.notes && (
              <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{goals.notes}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
