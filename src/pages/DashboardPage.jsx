import {
    CalendarCheck,
    ChevronRight,
    Search,
    User2,
} from "lucide-react"
import { Link } from "react-router-dom"

import AppShell from "../components/layout/AppShell"
import { useProfile } from "../context/ProfileContext"

const DASHBOARD_ACTIONS = [
    {
        to: "/doctors",
        title: "Find a doctor",
        description: "Browse verified doctors and available sessions.",
        icon: Search,
    },
    {
        to: "/appointments",
        title: "My appointments",
        description: "View, manage or review your appointments.",
        icon: CalendarCheck,
    },
    {
        to: "/profile",
        title: "My health profile",
        description: "Review your personal and health information.",
        icon: User2,
    },
]

function DashboardPage() {
    const { profile } = useProfile()
    const firstName = profile?.firstName || "there"

    return (
        <AppShell>
            <section className="mx-auto w-full max-w-6xl">
                <div className="rounded-3xl bg-gradient-to-br from-[#0A8F8E] to-[#086C79] px-6 py-8 text-white shadow-[0_18px_45px_rgba(8,108,121,0.16)] sm:px-9 sm:py-10">
                    <p className="text-sm font-semibold text-white/80">
                        Patient dashboard
                    </p>
                    <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                        Welcome back, {firstName}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
                        Find the right doctor, manage your bookings and keep your health information in one place.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {DASHBOARD_ACTIONS.map(({ to, title, description, icon: Icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className="group rounded-2xl border border-[#DCEDEF] bg-white p-5 shadow-[0_8px_24px_rgba(16,39,63,0.04)] transition hover:-translate-y-0.5 hover:border-[#0EA394]/40 hover:shadow-[0_14px_32px_rgba(16,39,63,0.08)]"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F6F4] text-[#0B8E85]">
                                <Icon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <h2 className="mt-4 text-lg font-bold text-[#10273F]">
                                {title}
                            </h2>
                            <p className="mt-1 min-h-10 text-sm leading-5 text-[#54708A]">
                                {description}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0B8E85]">
                                Open
                                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </AppShell>
    )
}

export default DashboardPage
