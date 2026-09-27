import {
    CalendarCheck,
    FileText,
    HandHeart,
    Headset,
    Home,
    Settings,
    Stethoscope,
    User2,
    UserRoundSearch,
    X,
} from "lucide-react"
import {
    NavLink,
} from "react-router-dom"

import logo from "../../assets/logo/nexcare-logo.svg"
import { useAuth } from "../../context/AuthContext"

const PATIENT_NAV_ITEMS = [
    {
        to: "/dashboard",
        label: "Home",
        icon: Home,
        ready: true,
    },
    {
        to: "/doctors",
        label: "Find a Doctor",
        icon: UserRoundSearch,
        ready: true,
    },
    {
        to: "/appointments",
        label: "Appointments",
        icon: CalendarCheck,
        ready: true,
    },
    {
        to: "/health-records",
        label: "Health Records",
        icon: FileText,
        ready: false,
    },
    {
        to: "/symptom-checker",
        label: "Symptom Checker",
        icon: Stethoscope,
        ready: false,
    },
    {
        to: "/profile",
        label: "My Profile",
        icon: User2,
        ready: true,
    },
    {
        to: "/support",
        label: "Help & Support",
        icon: Headset,
        ready: false,
    },
    {
        to: "/settings",
        label: "Settings",
        icon: Settings,
        ready: false,
    },
]

const DOCTOR_NAV_ITEMS = [
    {
        to: "/doctor",
        label: "Home",
        icon: Home,
        ready: true,
    },
    {
        to: "/doctor/appointments",
        label: "Appointments",
        icon: CalendarCheck,
        ready: true,
    },
    {
        to: "/doctor/availability",
        label: "Availability",
        icon: CalendarCheck,
        ready: true,
    },
    {
        to: "/doctor/profile",
        label: "My Profile",
        icon: User2,
        ready: true,
    },
    {
        to: "/doctor/settings",
        label: "Settings",
        icon: Settings,
        ready: false,
    },
]

function SidebarContent({
    items,
    homePath,
    onNavigate,
    showLogo = true,
}) {
    return (
        <>
            {showLogo && (
                <NavLink
                    to={homePath}
                    onClick={onNavigate}
                    className="inline-flex shrink-0"
                    aria-label="Go to NexCare dashboard"
                >
                    <img
                        src={logo}
                        alt="NexCare"
                        className="h-auto w-48 max-w-full"
                    />
                </NavLink>
            )}

            <nav
                className="flex flex-col gap-1"
                aria-label="Dashboard navigation"
            >
                {items.map(
                    ({
                        to,
                        label,
                        icon: Icon,
                        ready,
                    }) => (
                        <NavLink
                            key={to}
                            to={ready ? to : "#"}
                            end={to === homePath}
                            aria-disabled={!ready}
                            title={
                                ready
                                    ? label
                                    : `${label} — Coming soon`
                            }
                            onClick={(event) => {
                                if (!ready) {
                                    event.preventDefault()
                                    return
                                }

                                onNavigate?.()
                            }}
                            className={({
                                isActive,
                            }) => {
                                const active =
                                    isActive && ready

                                return [
                                    "flex items-center gap-3",
                                    "rounded-xl px-3 py-2.5",
                                    "text-[13.5px] font-semibold",
                                    "transition-colors duration-200",
                                    active
                                        ? "bg-[#E7F8F6] text-[#078B87]"
                                        : "text-slate-600",
                                    ready && !active
                                        ? "hover:bg-slate-50 hover:text-[#078B87]"
                                        : "",
                                    !ready
                                        ? "cursor-not-allowed opacity-60"
                                        : "",
                                ].join(" ")
                            }}
                        >
                            <Icon
                                className="h-[18px] w-[18px] shrink-0"
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="flex-1">
                                {label}
                            </span>

                            {!ready && (
                                <span className="sr-only">
                                    Coming soon
                                </span>
                            )}
                        </NavLink>
                    ),
                )}
            </nav>

            <div className="mt-auto flex shrink-0 flex-col gap-3 rounded-2xl bg-[#EAF9F7] p-7">
                <HandHeart
                    className="h-12 w-12 text-[#35969D]"
                    strokeWidth={1.2}
                    aria-hidden="true"
                />

                <div>
                    <p className="font-heading text-[15px] font-extrabold leading-tight text-[#278A91]">
                        Your Health
                        <br />
                        Our Priority
                    </p>

                    <p className="mt-2 text-xs leading-5 text-[#54708A]">
                        Better care for a healthier
                        tomorrow.
                    </p>
                </div>
            </div>
        </>
    )
}

function Sidebar({
    mobileOpen = false,
    onClose = () => {},
}) {
    const { role } = useAuth()

    const isDoctor = role === "DOCTOR"

    const navigationItems = isDoctor
        ? DOCTOR_NAV_ITEMS
        : PATIENT_NAV_ITEMS

    const homePath = isDoctor
        ? "/doctor"
        : "/dashboard"

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden w-64 shrink-0 flex-col gap-4 border-r border-[#DCEDEF] bg-white p-4 md:flex">
                <SidebarContent
                    items={navigationItems}
                    homePath={homePath}
                />
            </aside>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="absolute inset-0 bg-[#071E4A]/45 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <aside className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col gap-4 bg-white p-4 shadow-2xl">
                        <div className="flex shrink-0 items-center justify-between">
                            <NavLink
                                to={homePath}
                                onClick={onClose}
                                aria-label="Go to NexCare dashboard"
                            >
                                <img
                                    src={logo}
                                    alt="NexCare"
                                    className="h-auto w-40"
                                />
                            </NavLink>

                            <button
                                type="button"
                                aria-label="Close navigation menu"
                                onClick={onClose}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
                            >
                                <X
                                    size={20}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>

                        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
                            <SidebarContent
                                items={navigationItems}
                                homePath={homePath}
                                onNavigate={onClose}
                                showLogo={false}
                            />
                        </div>
                    </aside>
                </div>
            )}
        </>
    )
}

export default Sidebar
