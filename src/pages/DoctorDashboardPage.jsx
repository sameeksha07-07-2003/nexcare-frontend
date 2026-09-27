import {
  CalendarCheck2,
  CalendarClock,
  CircleAlert,
  Clock3,
  LoaderCircle,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getDoctorAppointmentSummary,
} from "../api/appointmentApi";
import {
  getMyDoctorAvailabilities,
} from "../api/doctorApi";
import DoctorVerificationBanner from "../components/doctors/DoctorVerificationBanner";
import { useProfile } from "../context/ProfileContext";

const EMPTY_SUMMARY = {
  today: 0,
  upcoming: 0,
  needsAction: 0,
};

const QUICK_ACTIONS = [
  {
    to: "/doctor/appointments",
    title: "Manage appointments",
    description: "Review patients and consultation outcomes.",
    icon: CalendarCheck2,
  },
  {
    to: "/doctor/availability",
    title: "Update availability",
    description: "Create and manage consultation sessions.",
    icon: CalendarClock,
  },
  {
    to: "/doctor/profile",
    title: "Complete profile",
    description: "Keep professional information accurate.",
    icon: UserRound,
  },
];

function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-label="Loading doctor dashboard">
      <div className="h-28 animate-pulse rounded-2xl bg-white" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    </div>
  );
}

export default function DoctorDashboardPage() {
  const {
    profile,
    status: profileStatus,
    error: profileError,
    loadProfile,
  } = useProfile();

  const [dashboardState, setDashboardState] = useState({
    status: "loading",
    summary: EMPTY_SUMMARY,
    activeSessions: 0,
    error: "",
  });
  const [refreshVersion, setRefreshVersion] = useState(0);

  const isApproved = profile?.verificationStatus === "APPROVED";

  useEffect(() => {
    if (!isApproved) {
      return undefined;
    }

    const controller = new AbortController();

    Promise.all([
      getDoctorAppointmentSummary({
        signal: controller.signal,
      }),
      getMyDoctorAvailabilities({
        signal: controller.signal,
      }),
    ])
      .then(([summary, availability]) => {
        const sessions = Array.isArray(availability)
          ? availability
          : [];

        setDashboardState({
          status: "success",
          summary: {
            ...EMPTY_SUMMARY,
            ...summary,
          },
          activeSessions: sessions.filter(
            (session) => session.active !== false,
          ).length,
          error: "",
        });
      })
      .catch((error) => {
        if (
          error?.code === "ERR_CANCELED" ||
          error?.name === "CanceledError"
        ) {
          return;
        }

        setDashboardState((current) => ({
          ...current,
          status: "error",
          error:
            error?.response?.data?.message ||
            "We could not load your dashboard summary.",
        }));
      });

    return () => controller.abort();
  }, [isApproved, refreshVersion]);

  if (profileStatus === "loading" || profileStatus === "idle") {
    return <DashboardSkeleton />;
  }

  if (profileStatus === "error" || !profile) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center">
        <CircleAlert
          className="mx-auto h-10 w-10 text-red-500"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-xl font-bold text-[#10273F]">
          Unable to load dashboard
        </h1>
        <p className="mt-2 text-sm text-[#54708A]">
          {profileError || "We could not load your doctor account."}
        </p>
        <button
          type="button"
          onClick={() => void loadProfile()}
          className="mt-5 rounded-xl bg-[#0EA394] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const summaryCards = [
    {
      label: "Today",
      value: dashboardState.summary.today,
      icon: Stethoscope,
      classes: "bg-[#E7F8F6] text-[#078B87]",
    },
    {
      label: "Upcoming",
      value: dashboardState.summary.upcoming,
      icon: CalendarCheck2,
      classes: "bg-[#ECF3FF] text-[#3B6FB6]",
    },
    {
      label: "Needs action",
      value: dashboardState.summary.needsAction,
      icon: Clock3,
      classes: "bg-[#FFF5E8] text-[#B76A12]",
    },
    {
      label: "Active sessions",
      value: dashboardState.activeSessions,
      icon: CalendarClock,
      classes: "bg-[#F1ECFF] text-[#7251B5]",
    },
  ];

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#0B8F86]">
            Doctor workspace
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
            Welcome back, Dr. {profile.firstName || profile.fullName}
          </h1>
          <p className="mt-2 text-sm text-[#52709B] sm:text-base">
            Here is an overview of your NexCare practice.
          </p>
        </div>

        <Link
          to="/doctor/availability"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0EA394] px-5 text-sm font-semibold text-white transition hover:bg-[#0B7F73]"
        >
          Manage availability
        </Link>
      </header>

      <div className="mt-6">
        <DoctorVerificationBanner
          status={profile.verificationStatus}
          showProfileAction
        />
      </div>

      {isApproved && (
        <section className="mt-6" aria-labelledby="practice-overview-heading">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="practice-overview-heading"
              className="text-xl font-bold text-[#10273F]"
            >
              Practice overview
            </h2>
            <Link
              to="/doctor/appointments"
              className="text-sm font-semibold text-[#0B8F86] hover:underline"
            >
              View appointments
            </Link>
          </div>

          {dashboardState.status === "loading" && (
            <div
              role="status"
              className="mt-4 flex min-h-32 items-center justify-center rounded-2xl border border-[#DCEDEF] bg-white text-sm text-[#54708A]"
            >
              <LoaderCircle
                className="mr-3 h-5 w-5 animate-spin text-[#0EA394]"
                aria-hidden="true"
              />
              Loading practice overview...
            </div>
          )}

          {dashboardState.status === "error" && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-white p-6 text-center">
              <p className="text-sm text-red-700">
                {dashboardState.error}
              </p>
              <button
                type="button"
                onClick={() => {
                  setDashboardState((current) => ({
                    ...current,
                    status: "loading",
                    error: "",
                  }));
                  setRefreshVersion((version) => version + 1);
                }}
                className="mt-4 rounded-xl border border-[#0EA394] px-4 py-2 text-sm font-semibold text-[#0B7F73]"
              >
                Try again
              </button>
            </div>
          )}

          {dashboardState.status === "success" && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map(({ label, value, icon: Icon, classes }) => (
                <article
                  key={label}
                  className="rounded-2xl border border-[#DCEDEF] bg-white p-5 shadow-[0_8px_30px_rgba(16,39,63,0.04)]"
                >
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${classes}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-3xl font-bold text-[#10273F]">
                    {value ?? 0}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#54708A]">
                    {label}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      <section className="mt-7" aria-labelledby="quick-actions-heading">
        <h2
          id="quick-actions-heading"
          className="text-xl font-bold text-[#10273F]"
        >
          Quick actions
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {QUICK_ACTIONS.map(({ to, title, description, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-2xl border border-[#DCEDEF] bg-white p-5 shadow-[0_8px_30px_rgba(16,39,63,0.04)] transition hover:-translate-y-0.5 hover:border-[#0EA394]/40 hover:shadow-[0_12px_36px_rgba(16,39,63,0.08)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA394]/20"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F8F6] text-[#078B87] transition group-hover:bg-[#0EA394] group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-[#10273F]">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#54708A]">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
