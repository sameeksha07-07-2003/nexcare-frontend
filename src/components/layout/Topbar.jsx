import React from "react";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import Avatar from "../common/Avatar";

/**
 * Topbar
 * Props:
 * - onMenuClick: opens the mobile sidebar drawer
 * - user: { fullName, role, avatarUrl, gender, notificationCount } — wire to AuthContext
 */
export default function Topbar({ onMenuClick, user }) {
  const name = user?.fullName || "Riya Sharma";
  const role = user?.role || "Patient";
  const notificationCount = user?.notificationCount ?? 3;

  return (
    <header className="flex h-[64px] items-center gap-3 border-b border-[#DCEDEF] bg-white px-4 sm:h-[70px] sm:gap-4 sm:px-5 md:px-7">
      <button aria-label="Open menu" onClick={onMenuClick} className="shrink-0 text-[#10273F] md:hidden">
        <Menu size={22} />
      </button>

      <div className="flex flex-1 items-center gap-2 rounded-[12px] border border-[#DCEDEF] bg-[#F2F9FA] px-3 py-[8px] sm:px-4 sm:py-[10px]">
        <Search size={18} className="shrink-0 text-[#54708A]" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search doctors, specialists, or health services..."
          className="w-full min-w-0 bg-transparent text-[13px] text-[#10273F] outline-none placeholder:text-[#54708A] sm:text-[14px]"
        />
      </div>

      <button aria-label="Notifications" className="relative shrink-0 text-[#10273F]">
        <Bell size={22} />
        {notificationCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {notificationCount}
          </span>
        )}
      </button>

      <button className="flex shrink-0 items-center gap-2" aria-label="Account menu">
        <Avatar
          photoUrl={user?.avatarUrl}
          gender={user?.gender}
          name={name}
          size="sm"
        />
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-[14px] font-semibold text-[#10273F]">{name}</span>
          <span className="block text-[12px] text-[#54708A]">{role}</span>
        </span>
        <ChevronDown size={16} className="hidden text-[#54708A] sm:block" aria-hidden="true" />
      </button>
    </header>
  );
}