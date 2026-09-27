import { ShieldCheck } from "lucide-react";

export default function SignupRightPanel() {
  return (
    <aside
      className="
        relative hidden min-h-screen overflow-hidden
        xl:block
      "
      aria-label="NexCare trusted healthcare"
    >
      {/* Improves text and card visibility over the background image */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r
          from-[#DFF7F5]/40
          via-transparent
          to-[#0B2D5C]/5
        "
        aria-hidden="true"
      />

      {/* Soft visual separation between form and image */}
      <div
        className="
          pointer-events-none absolute inset-y-0 left-0 w-24
          bg-gradient-to-r
          from-[#EAF9F8]
          to-transparent
        "
        aria-hidden="true"
      />

      {/* Trust card */}
      <div
        className="
          absolute right-8 top-10
          flex max-w-[310px] items-center gap-4
          rounded-2xl
          border border-white/70
          bg-white/90
          px-5 py-4
          shadow-[0_18px_45px_rgba(16,39,63,0.13)]
          backdrop-blur-md
          2xl:right-12 2xl:top-14
        "
      >
        <span
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-full
            bg-[#DDF7F4]
            text-[#0EA394]
          "
        >
          <ShieldCheck
            className="h-6 w-6"
            strokeWidth={2.2}
            aria-hidden="true"
          />
        </span>

        <div>
          <p className="text-base font-bold text-[#0B2D5C]">
            Verified professionals
          </p>

          <p className="mt-0.5 text-sm text-[#54708A]">
            Secure healthcare
          </p>
        </div>
      </div>

      {/* Bottom message */}
      <div
        className="
          absolute bottom-8 left-1/2
          w-[calc(100%-4rem)] max-w-xl
          -translate-x-1/2
          rounded-2xl
          border border-white/60
          bg-white/85
          px-6 py-5
          text-center
          shadow-[0_18px_45px_rgba(16,39,63,0.12)]
          backdrop-blur-md
          2xl:bottom-12
        "
      >
        <p className="text-lg font-bold text-[#0B2D5C]">
          Better care begins with trusted connections
        </p>

        <p className="mt-1 text-sm leading-6 text-[#54708A]">
          NexCare helps patients connect with verified
          healthcare professionals through a secure and
          transparent experience.
        </p>
      </div>
    </aside>
  );
}