import React from "react";

/**
 * InfoRow — read-only [icon] label / value row used inside profile cards.
 *
 * Props:
 * - icon: lucide-react icon component
 * - label: string
 * - value: string | number | null | undefined → renders "Not provided" when empty
 */
export default function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[10px] bg-[#F2F9FA] px-[14px] py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0EA394]">
        {Icon && <Icon size={18} strokeWidth={2} aria-hidden="true" />}
      </span>
      <div className="min-w-0">
        <p className="text-[12px] text-[#54708A]">{label}</p>
        <p className="truncate text-[14px] font-semibold text-[#10273F]">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}