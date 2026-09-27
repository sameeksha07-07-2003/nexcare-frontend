import { useState } from "react"

import { useProfile } from "../../context/ProfileContext"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function AppShell({ children }) {
    const [mobileNavOpen, setMobileNavOpen] =
        useState(false)

    const { profile } = useProfile()

    const topbarUser = profile
        ? {
              fullName: profile.fullName,
              role: profile.role,
              avatarUrl: profile.avatarUrl,
              gender: profile.genderRaw,
          }
        : null

    function openMobileNavigation() {
        setMobileNavOpen(true)
    }

    function closeMobileNavigation() {
        setMobileNavOpen(false)
    }

    return (
        <div className="h-screen overflow-hidden bg-[#F6FBFA]">
            <div className="flex h-full">
                <Sidebar
                    mobileOpen={mobileNavOpen}
                    onClose={closeMobileNavigation}
                />

                <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
                    <Topbar
                        onMenuClick={
                            openMobileNavigation
                        }
                        user={topbarUser}
                    />

                    <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-7 md:py-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default AppShell