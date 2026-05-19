import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-code">404</div>
        <h1>Page Not Found</h1>
        <p>Looks like this page skipped leg day — it doesn't exist.</p>
        <Link to="/dashboard" className="btn btn-primary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
