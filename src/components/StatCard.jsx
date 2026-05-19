import './StatCard.css'

export default function StatCard({ icon, label, value, unit, color, sub }) {
  return (
    <div className="stat-card card" style={{ '--card-color': color }}>
      <div className="stat-icon" style={{ background: `${color}22`, color }}>
        {icon}
      </div>
      <div className="stat-body">
        <p className="stat-label">{label}</p>
        <div className="stat-value-row">
          <span className="stat-value">{value ?? '—'}</span>
          {unit && <span className="stat-unit">{unit}</span>}
        </div>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  )
}
