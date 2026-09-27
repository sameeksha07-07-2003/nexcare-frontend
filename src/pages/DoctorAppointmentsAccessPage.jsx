import {
  CalendarClock,
  CircleAlert,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

import DoctorVerificationBanner from "../components/doctors/DoctorVerificationBanner";
import { useProfile } from "../context/ProfileContext";
import DoctorAppointmentsPage from "./DoctorAppointmentsPage";

export default function DoctorAppointmentsAccessPage() {
  const {
    profile,
    status,
    error,
    loadProfile,
  } = useProfile();

  if (status === "loading" || status === "idle") {
    return (
      <div
        role="status"
        className="flex min-h-[55vh] items-center justify-center text-sm font-medium text-[#54708A]"
      >
        <LoaderCircle
          className="mr-3 h-5 w-5 animate-spin text-[#0EA394]"
          aria-hidden="true"
        />
        Checking your verification status...
      </div>
    );
  }

  if (status === "error" || !profile) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center">
        <CircleAlert
          className="mx-auto h-10 w-10 text-red-500"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-xl font-bold text-[#10273F]">
          Unable to verify your account
        </h1>
        <p className="mt-2 text-sm text-[#54708A]">
          {error || "We could not load your doctor profile."}
        </p>
        <button
          type="button"
          onClick={() => void loadProfile()}
          className="mt-5 rounded-xl bg-[#0EA394] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B7F73]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (profile.verificationStatus === "APPROVED") {
    return <DoctorAppointmentsPage />;
  }

  const isRejected = profile.verificationStatus === "REJECTED";

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
          Appointment Management
        </h1>
        <p className="mt-2 text-sm text-[#52709B] sm:text-base">
          Review your schedule and manage patient appointments.
        </p>
      </header>

      <div className="mt-6">
        <DoctorVerificationBanner
          status={profile.verificationStatus}
          showProfileAction
        />
      </div>

      <section className="mt-6 rounded-2xl border border-dashed border-[#CFE3E7] bg-white px-6 py-14 text-center shadow-[0_8px_30px_rgba(16,39,63,0.04)]">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F8F6]">
          <CalendarClock
            className="h-8 w-8 text-[#0EA394]"
            aria-hidden="true"
          />
        </span>

        <h2 className="mt-5 text-xl font-bold text-[#071E4A]">
          {isRejected
            ? "Appointment access is unavailable"
            : "No appointments available yet"}
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#54708A]">
          {isRejected
            ? "Your profile needs attention before patients can find you or book appointments."
            : "Patients can book your sessions after your doctor profile is approved. You can prepare your availability while verification is in progress."}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/doctor/profile"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0EA394] px-5 text-sm font-semibold text-white transition hover:bg-[#0B7F73]"
          >
            Review profile
          </Link>

          {!isRejected && (
            <Link
              to="/doctor/availability"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0EA394] bg-white px-5 text-sm font-semibold text-[#0B7F73] transition hover:bg-[#E3F6F4]"
            >
              Set availability
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
