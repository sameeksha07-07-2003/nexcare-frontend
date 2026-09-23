import React from "react";
import { Mail, Phone } from "lucide-react";
import Avatar from "../common/Avatar";

/**
 * ProfileHero — gradient identity card. No leaf artwork per the updated spec:
 * subtle linear-gradient + border + soft shadow only.
 */
export default function ProfileHero({ profile }) {
  const {
    fullName,
    role = "Patient",
    email,
    phone,
    isActive = true,
    avatarUrl,
    genderRaw,
  } = profile || {};

  return (
    <div
      className="mb-4 flex flex-col gap-4 rounded-[14px] border border-[#D5EFEC] p-4 shadow-[0_4px_16px_rgba(16,39,63,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-5 md:p-6"
      style={{ background: "linear-gradient(135deg, #F0FCFB, #E3F6F4)" }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <Avatar
          photoUrl={avatarUrl}
          gender={genderRaw}
          name={fullName}
          size="xl"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-[19px] font-bold text-[#10273F] sm:text-[22px] md:text-[24px]">
              {fullName || "Not provided"}
            </h1>
            <span className="shrink-0 rounded-full bg-[#E3F6F4] px-3 py-[2px] text-[12px] font-semibold text-[#0EA394]">
              {role}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#54708A] sm:text-[13px]">
            <span className="flex items-center gap-1.5">
              <Mail size={14} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{email || "Not provided"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} aria-hidden="true" className="shrink-0" />
              {phone || "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {isActive && (
        <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-[#DDF7EA] px-3 py-1 text-[13px] font-semibold text-[#219653]">
          <span className="h-[7px] w-[7px] rounded-full bg-[#219653]" />
          Active
        </span>
      )}
    </div>
  );
}