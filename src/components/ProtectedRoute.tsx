import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated()) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (adminOnly && !isAdmin()) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Zugriff verweigert</h1>
        <p className="text-gray-600">Sie haben keine Berechtigung, diese Seite zu besuchen.</p>
        <p className="text-sm text-gray-500 mt-4">
          Diese Funktion ist nur für Administratoren verfügbar.
        </p>
      </div>
    )
  }

  return <>{children}</>
} 