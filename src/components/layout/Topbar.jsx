import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, Menu, LogOut, User2 } from "lucide-react";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";

/**
 * Topbar
 * Props:
 * - onMenuClick: opens the mobile sidebar drawer
 * - user: { fullName, role, avatarUrl, gender, notificationCount } — from ProfileContext via AppShell
 */
export default function Topbar({ onMenuClick, user }) {
  const name = user?.fullName || "Riya Sharma";
  const role = user?.role || "Patient";
  const notificationCount = user?.notificationCount ?? 3;

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleLogout() {
    setMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  }

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

      <div className="relative shrink-0" ref={menuRef}>
        <button
          className="flex items-center gap-2"
          aria-label="Account menu"
          aria-haspopup="true"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Avatar photoUrl={user?.avatarUrl} gender={user?.gender} name={name} size="sm" />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[14px] font-semibold text-[#10273F]">{name}</span>
            <span className="block text-[12px] text-[#54708A]">{role}</span>
          </span>
          <ChevronDown
            size={16}
            className={`hidden text-[#54708A] transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+10px)] w-64 overflow-hidden rounded-[14px] border border-[#DCEDEF] bg-white shadow-[0_12px_28px_rgba(16,39,63,0.12)]"
          >
            <div className="flex items-center gap-3 border-b border-[#EEF4F6] px-4 py-3">
              <Avatar photoUrl={user?.avatarUrl} gender={user?.gender} name={name} size="md" />
              <div className="min-w-0">
                <p className="truncate text-[14px] font-semibold text-[#10273F]">{name}</p>
                <p className="truncate text-[12px] text-[#54708A]">{role}</p>
              </div>
            </div>

            <div className="py-1.5">
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[14px] font-medium text-[#10273F] transition-colors hover:bg-[#F2F9FA]"
              >
                <User2 size={17} aria-hidden="true" />
                My Profile
              </button>

              <button
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut size={17} aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}