import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { useUserRole } from '../hooks/useUserRole'
import { USER_ROLES } from '../constants/roles'

interface PrivateRouteProps {
  children: React.ReactNode
  roles?: Array<keyof typeof USER_ROLES>
}

export function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const { user, loading } = useAuth()
  const { role } = useUserRole()
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return children
}