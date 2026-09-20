import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRoute from './ProtectedRoute'

// Mirror image of ProtectedRoute: keeps LOGGED-IN users out of /login and /signup.
function PublicOnlyRoute() {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (isAuthenticated) {
        // Send them where they were originally heading (saved by ProtectedRoute), else the dashboard
        const target = location.state?.from?.pathname ?? '/dashboard'
        return <Navigate to={target} replace />
    }
    return <Outlet />
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Only for visitors who are NOT logged in */}
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Route>

                {/* Only for logged-in users */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>

                {/* Any unknown URL */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes