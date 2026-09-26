// src/components/layout/Sidebar.jsx
import { NavLink } from "react-router-dom";
import {
  Home,
  CalendarCheck,
  FileText,
  Stethoscope,
  MessageSquare,
  User2,
  Headset,
  Settings,
  X,HandHeart,
} from "lucide-react";
import logo from "../../assets/logo/nexcare-logo.svg";


// NOTE: only "Home" (-> /dashboard) and "My Profile" (-> /profile) have real
// pages behind them right now. The rest are listed here to match the target
// UI's navigation structure, but have no route/page yet — wire them up as
// each feature gets built. Clicking them today will do nothing / 404.
const NAV_ITEMS = [
  { to: "/dashboard", label: "Home", icon: Home, ready: true },
  { to: "/appointments", label: "Appointments", icon: CalendarCheck, ready: false },
  { to: "/health-records", label: "Health Records", icon: FileText, ready: false },
  { to: "/symptom-checker", label: "Symptom Checker", icon: Stethoscope, ready: false },
  { to: "/messages", label: "Messages", icon: MessageSquare, ready: false, badge: 2 }, // dummy count
  { to: "/profile", label: "My Profile", icon: User2, ready: true },
  { to: "/support", label: "Help & Support", icon: Headset, ready: false },
  { to: "/settings", label: "Settings", icon: Settings, ready: false },
];

function SidebarContent({ onNavigate, showLogo = true }) {
  return (
    <>
      {showLogo && <img src={logo} alt="NexCare" className="w-92" />}

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, ready, badge }) => (
          <NavLink
            key={to}
            to={ready ? to : "#"}
            onClick={(e) => {
              if (!ready) {
                e.preventDefault();
                return;
              }
              onNavigate?.();
            }}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-semibold transition ${
                isActive && ready
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50"
              } ${!ready ? "cursor-default" : ""}`
            }
          >
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            <span className="flex-1">{label}</span>
            {badge != null && (
              <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Simple two-line promo card — no decorative artwork, matches target */}
      <div className="mt-auto  flex flex-col  gap-3 rounded-2xl bg-teal-50 p-8">
  <HandHeart 
      size={48}             /* Size badhane ke liye (default 24 hota hai) */
      strokeWidth={1}       /* Stroke thick karne ke liye (default 2 hota hai) */
      color="#35969D"       /* Aapka custom hex color */
    />
        <p className="font-heading font-extrabold text-[#35969D] text-[15px] leading-tight text-navy-900">
          Your Health
          <br />
          Our Priority
        </p>
      </div>
    </>
  );
}

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  return (
    <>
      {/* Desktop: static sidebar */}
      <aside className="hidden md:flex w-64 gap-4 flex-col bg-white border-r border-teal-100 p-4 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile: overlay drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <aside className="relative z-10 flex h-full w-72 max-w-[80vw] flex-col gap-4 bg-white p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <img src={logo} alt="NexCare" className="w-40" />
              <button
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
              <SidebarContent onNavigate={onClose} showLogo={false} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}