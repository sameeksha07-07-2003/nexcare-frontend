import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ allowedRoles }) {
    const { isAuthenticated, role } = useAuth()
    const location = useLocation()

    // 1. Not logged in -> go to login, remembering where they were heading
    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    // 2. Logged in, but this page is restricted to other roles
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/dashboard" replace />
    }

    // 3. All good: show the child page
    return <Outlet />
}

export default ProtectedRoute