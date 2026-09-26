import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useProfile } from "../../context/ProfileContext";

/**
 * AppShell — authenticated page layout: Sidebar + Topbar + main content area.
 * Handles the mobile sidebar drawer toggle so per-page components don't need to.
 *
 * Height is locked to the viewport (h-screen) instead of growing with content
 * (min-h-screen). Only the <main> region scrolls internally when its content
 * is taller than the viewport — the sidebar and topbar never move, and there
 * is no separate outer/browser-level scrollbar.
 *
 * Topbar reads name/avatar from the shared ProfileContext, so it always
 * matches whatever is shown on the profile page (including right after a
 * photo upload) without AppShell needing its own fetch.
 */
export default function AppShell({ children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { profile } = useProfile();

  const topbarUser = profile
    ? {
        fullName: profile.fullName,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
        gender: profile.genderRaw,
      }
    : null;

  return (
    <div className="h-screen overflow-hidden bg-[#F6FBFA]">
      <div className="flex h-full">
        <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} user={topbarUser} />
          <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}