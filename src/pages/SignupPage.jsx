import {
  Activity,
  HeartPulse,
  Pill,
  Plus,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import nexcareLogo from "../assets/logo/nexcare-logo.svg";

import SignupForm from "../components/auth/SignupForm";

function SignupBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left background circle */}
      <div className="absolute -left-32 -top-36 h-[340px] w-[340px] rounded-full bg-[#CFF4F1]/65 blur-sm sm:h-[430px] sm:w-[430px]" />

      {/* Top-right outlined circle */}
      <div className="absolute -right-32 -top-40 h-[360px] w-[360px] rounded-full border-[55px] border-[#DDF5F4]/75 sm:h-[460px] sm:w-[460px] sm:border-[72px]" />

      {/* Bottom-right circle */}
      <div className="absolute -bottom-48 -right-32 h-[420px] w-[420px] rounded-full bg-[#D8F5F2]/70 sm:h-[540px] sm:w-[540px]" />

      {/* Bottom-left outlined circle */}
      <div className="absolute -bottom-52 left-[8%] hidden h-[390px] w-[390px] rounded-full border-[65px] border-[#E6F4F5]/80 lg:block" />

      {/* Central white glow */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />

      {/* Top-left dotted pattern */}
      <div
        className="absolute left-[6%] top-[18%] hidden h-28 w-28 opacity-40 sm:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(14,163,148,0.28) 1.5px, transparent 1.5px)",

          backgroundSize:
            "16px 16px",
        }}
      />

      {/* Bottom-right dotted pattern */}
      <div
        className="absolute bottom-[8%] right-[7%] hidden h-28 w-28 opacity-35 lg:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,39,63,0.20) 1.5px, transparent 1.5px)",

          backgroundSize:
            "16px 16px",
        }}
      />

      {/* Medical decorations */}
      <Plus
        className="absolute left-[5%] top-[38%] hidden h-20 w-20 text-[#0EA394]/[0.07] sm:block"
        aria-hidden="true"
      />

      <Stethoscope
        className="absolute bottom-[12%] left-[7%] hidden h-24 w-24 -rotate-12 text-[#0EA394]/[0.07] lg:block"
        aria-hidden="true"
      />

      <HeartPulse
        className="absolute right-[7%] top-[25%] hidden h-24 w-24 text-[#0EA394]/[0.07] lg:block"
        aria-hidden="true"
      />

      <ShieldCheck
        className="absolute bottom-[17%] right-[15%] hidden h-20 w-20 rotate-6 text-[#10273F]/[0.05] xl:block"
        aria-hidden="true"
      />

      <Pill
        className="absolute right-[4%] top-[62%] hidden h-16 w-16 rotate-45 text-[#0EA394]/[0.07] lg:block"
        aria-hidden="true"
      />

      {/* ECG decorations */}
      <Activity
        className="absolute left-[-2%] top-[52%] hidden h-28 w-[32%] text-[#0EA394]/[0.07] lg:block"
        aria-hidden="true"
      />

      <Activity
        className="absolute bottom-[8%] right-[-3%] hidden h-24 w-[28%] text-[#0EA394]/[0.06] xl:block"
        aria-hidden="true"
      />
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F4FAFA] text-[#10273F]">
      <SignupBackground />

      {/* Sticky signup header */}
      <header className="sticky top-0 z-50 border-b border-[#DCEDEF]/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
          <Link
            to="/"
            aria-label="Go to NexCare homepage"
            className="shrink-0 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA394] focus-visible:ring-offset-2"
          >
            <img
              src={nexcareLogo}
              alt="NexCare"
              className="h-9 w-auto sm:h-10"
            />
          </Link>

          <p className="text-sm text-[#54708A]">
            <span className="hidden sm:inline">
              Already have an account?{" "}
            </span>

            <Link
              to="/login"
              className="font-semibold text-[#0B8F86] transition-colors hover:text-[#086F69] focus:outline-none focus-visible:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </header>

      {/* 
        Normal document scrolling is intentionally allowed.
        There is no h-screen or overflow-hidden on desktop.
      */}
      <main className="relative z-10 flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <div className="w-full max-w-[1180px]">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}