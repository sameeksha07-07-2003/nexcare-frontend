import {
  CircleAlert,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_CONTENT = {
  APPROVED: {
    icon: ShieldCheck,
    title: "Profile approved",
    message:
      "Your public profile is visible and patients can book your available sessions.",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
  PENDING: {
    icon: Clock3,
    title: "Verification pending",
    message:
      "Our team is reviewing your professional information. Appointment management will become available after approval.",
    className:
      "border-amber-200 bg-amber-50 text-amber-900",
  },
  REJECTED: {
    icon: CircleAlert,
    title: "Profile needs attention",
    message:
      "Review your professional details and correct any incomplete information before requesting assistance.",
    className:
      "border-red-200 bg-red-50 text-red-800",
  },
};

export default function DoctorVerificationBanner({
  status,
  showApproved = true,
  showProfileAction = false,
}) {
  const normalizedStatus = String(status || "PENDING").toUpperCase();

  if (normalizedStatus === "APPROVED" && !showApproved) {
    return null;
  }

  const content = STATUS_CONTENT[normalizedStatus] ?? STATUS_CONTENT.PENDING;
  const StatusIcon = content.icon;

  return (
    <div
      role="status"
      className={`flex flex-col gap-4 rounded-2xl border px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5 ${content.className}`}
    >
      <div className="flex items-start gap-3">
        <StatusIcon
          className="mt-0.5 h-5 w-5 shrink-0"
          aria-hidden="true"
        />

        <div>
          <p className="font-bold">{content.title}</p>
          <p className="mt-1 text-sm leading-6">{content.message}</p>
        </div>
      </div>

      {showProfileAction && normalizedStatus !== "APPROVED" && (
        <Link
          to="/doctor/profile"
          className="inline-flex min-h-10 shrink-0 items-center justify-center self-start rounded-xl border border-current/25 bg-white/70 px-4 text-sm font-semibold transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
        >
          Review profile
        </Link>
      )}
    </div>
  );
}
