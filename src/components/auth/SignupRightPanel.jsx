import { Heart, HeartPulse, Star, UserCheck, Users } from "lucide-react";

// Replace these with real numbers from your product.
const STATS = [
  { icon: Users, value: "10K+", label: "Happy Patients" },
  { icon: UserCheck, value: "500+", label: "Verified Doctors" },
  { icon: Star, value: "4.8/5", label: "Patient Satisfaction" },
];

// Handwritten look for the tagline. Add the Google font "Caveat" in index.html
// for the best result; the other fonts are fallbacks.
const SCRIPT_FONT = '"Caveat", "Ink Free", "Segoe Script", "Bradley Hand", cursive';

// Everything here is absolutely positioned inside the panel, so this panel never
// adds height to the page (no extra scrollbar). It sits on top of the background photo.
export default function SignupRightPanel() {
  return (
    <div className="relative hidden min-w-0 flex-1 self-stretch xl:block">
      {/* Tagline */}
      <div className="absolute left-3 top-[clamp(28px,5vh,60px)] xl:left-5 2xl:left-8">
        <div
          className="-rotate-[9deg] origin-bottom-left whitespace-nowrap font-bold leading-[1.05] text-[#0B2D5C] text-[length:clamp(22px,3.7vh,38px)]"
          style={{ fontFamily: SCRIPT_FONT }}
        >
          <p>Better Care</p>
          <p>
            For a Brighter
            <Heart
              className="ml-2 inline-block h-[0.7em] w-[0.7em] align-baseline text-[#10A9A5]"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </p>
          <p className="relative ml-[1.1em] w-fit">
            Tomorrow
            <svg
              viewBox="0 0 200 14"
              className="absolute -bottom-1 left-0 h-[0.3em] w-[105%]"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M3 10 C 50 2, 130 2, 197 7"
                fill="none"
                stroke="#10A9A5"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </p>
        </div>
      </div>

      {/* Floating info card */}
      <div className="absolute right-4 top-[clamp(120px,22%,240px)] flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-sm">
        <HeartPulse
          className="h-8 w-8 shrink-0 text-[#10A9A5]"
          strokeWidth={2}
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-semibold leading-tight text-[#0B2D5C]">
            Personalized care
          </p>
          <p className="text-xs leading-tight text-[#5B82AA]">
            for every stage of life
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute inset-x-4 bottom-4 mx-auto grid max-w-[540px] grid-cols-3 divide-x divide-slate-200 rounded-2xl bg-white/90 py-3 shadow-lg shadow-slate-900/10 backdrop-blur-sm xl:bottom-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center px-2 text-center">
            <Icon className="h-5 w-5 text-[#10A9A5]" strokeWidth={2} aria-hidden="true" />
            <p className="mt-1 text-lg font-extrabold leading-none text-[#0B2D5C] xl:text-xl">
              {value}
            </p>
            <p className="mt-1 text-[11px] leading-tight text-[#5B82AA] xl:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}