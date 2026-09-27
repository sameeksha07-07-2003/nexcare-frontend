import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom"
import { lazy, Suspense } from "react"

import { useAuth } from "../context/AuthContext"

import ProtectedRoute from "./ProtectedRoute"

import AppShell from "../components/layout/AppShell"

const HomePage = lazy(() => import("../pages/HomePage"))
const LoginPage = lazy(() => import("../pages/LoginPage"))
const SignupPage = lazy(() => import("../pages/SignupPage"))
const DashboardPage = lazy(() => import("../pages/DashboardPage"))
const PatientProfilePage = lazy(() => import("../pages/PatientProfilePage"))
const DoctorDiscoveryPage = lazy(() => import("../pages/DoctorDiscoveryPage"))
const DoctorPublicProfilePage = lazy(() => import("../pages/DoctorPublicProfilePage"))
const MyAppointmentsPage = lazy(() => import("../pages/MyAppointmentsPage"))
const DoctorAppointmentsAccessPage = lazy(() => import("../pages/DoctorAppointmentsAccessPage"))
const DoctorDashboardPage = lazy(() => import("../pages/DoctorDashboardPage"))
const DoctorProfilePage = lazy(() => import("../pages/DoctorProfilePage"))
const DoctorAvailabilityPage = lazy(() => import("../pages/DoctorAvailabilityPage"))

function RouteFallback() {
    return (
        <div
            role="status"
            className="flex min-h-screen items-center justify-center bg-[#F6FBFA] text-sm font-medium text-[#54708A]"
        >
            Loading NexCare...
        </div>
    )
}

/**
 * Returns the correct landing page according to the logged-in role.
 */
function getAuthenticatedHome(role) {
    const normalizedRole = String(role || "").toUpperCase()

    if (normalizedRole === "DOCTOR") {
        return "/doctor"
    }

    if (normalizedRole === "PATIENT") {
        return "/dashboard"
    }

    return "/"
}

/**
 * Prevents logged-in users from accessing login and signup pages.
 */
function PublicOnlyRoute() {
    const { isAuthenticated, role } = useAuth()
    const location = useLocation()

    if (isAuthenticated) {
        const requestedPath = location.state?.from?.pathname

        return (
            <Navigate
                to={
                    requestedPath ||
                    getAuthenticatedHome(role)
                }
                replace
            />
        )
    }

    return <Outlet />
}

/**
 * Allows a route only when the logged-in user has the required role.
 *
 * Example:
 * allowedRole="PATIENT"
 * allowedRole="DOCTOR"
 */
function RoleRoute({ allowedRole }) {
    const { role } = useAuth()

    const currentRole = String(role || "").toUpperCase()
    const requiredRole = String(allowedRole || "").toUpperCase()

    if (currentRole !== requiredRole) {
        return (
            <Navigate
                to={getAuthenticatedHome(currentRole)}
                replace
            />
        )
    }

    return <Outlet />
}

function AppRoutes() {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
            <Routes>
                {/* Public routes */}
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/doctors"
                    element={<DoctorDiscoveryPage />}
                />

                <Route
                    path="/doctors/:doctorId"
                    element={<DoctorPublicProfilePage />}
                />

                {/* Only logged-out users */}
                <Route element={<PublicOnlyRoute />}>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/signup"
                        element={<SignupPage />}
                    />
                </Route>

                {/* Any logged-in user */}
                <Route element={<ProtectedRoute />}>
                    {/* Patient-only routes */}
                    <Route
                        element={
                            <RoleRoute allowedRole="PATIENT" />
                        }
                    >
                        <Route
                            path="/dashboard"
                            element={<DashboardPage />}
                        />

                        <Route
                            path="/profile"
                            element={<PatientProfilePage />}
                        />

                        <Route
                            path="/appointments"
                            element={
                                <AppShell>
                                    <MyAppointmentsPage />
                                </AppShell>
                            }
                        />
                    </Route>

                    {/* Doctor-only routes */}
                    <Route
                        element={
                            <RoleRoute allowedRole="DOCTOR" />
                        }
                    >
                        <Route
                            path="/doctor"
                            element={
                                <AppShell>
                                    <DoctorDashboardPage />
                                </AppShell>
                            }
                        />

                        <Route
                            path="/doctor/profile"
                            element={
                                <AppShell>
                                    <DoctorProfilePage />
                                </AppShell>
                            }
                        />

                        <Route
                            path="/doctor/availability"
                            element={
                                <AppShell>
                                    <DoctorAvailabilityPage />
                                </AppShell>
                            }
                        />

                        <Route
                            path="/doctor/appointments"
                            element={
                                <AppShell>
                                    <DoctorAppointmentsAccessPage />
                                </AppShell>
                            }
                        />
                    </Route>
                </Route>

                {/* Unknown routes */}
                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRoutes
