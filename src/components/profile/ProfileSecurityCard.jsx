import React from "react";
import { ShieldCheck } from "lucide-react";

export default function ProfileSecurityCard() {
  return (
    <section className="rounded-[12px] bg-[#E3F6F4] p-5">
      <header className="mb-3 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0EA394]">
          <ShieldCheck size={20} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-[17px] font-bold text-[#10273F]">Profile Security</h2>
          <p className="text-[13px] text-[#54708A]">
            Your information is securely handled and protected.
          </p>
        </div>
      </header>
      <div className="flex gap-3 rounded-[10px] bg-white p-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E3F6F4] text-[#0EA394]">
          <ShieldCheck size={18} aria-hidden="true" />
        </span>
        <p className="text-[13px] leading-snug text-[#10273F]">
          We keep your personal and health information safe and confidential.
        </p>
      </div>
    </section>
  );
}