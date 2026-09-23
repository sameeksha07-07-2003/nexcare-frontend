import React from "react";

/**
 * SectionCard — shared white card shell with the
 * [icon circle] Title / Subtitle header pattern used by every
 * major card on the Patient Profile page.
 *
 * Props:
 * - icon: lucide-react icon component
 * - title, subtitle: strings
 * - children: card body
 * - className: extra classes on the outer <section>
 */
export default function SectionCard({ icon: Icon, title, subtitle, children, className = "" }) {
  return (
    <section
      className={`rounded-[14px] border border-[#DCEDEF] bg-white p-5 shadow-[0_4px_16px_rgba(16,39,63,0.04)] transition-shadow duration-150 ${className}`}
    >
      {(title || Icon) && (
        <header className="mb-4 flex items-start gap-3">
          {Icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3F6F4] text-[#0EA394]">
              <Icon size={20} strokeWidth={2} aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            {title && <h2 className="text-[17px] font-bold text-[#10273F]">{title}</h2>}
            {subtitle && <p className="text-[13px] text-[#54708A]">{subtitle}</p>}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}