import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ClipLoader } from 'react-spinners'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="spinner-center" style={{ minHeight: '100vh' }}>
        <ClipLoader color="var(--accent)" size={40} />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
