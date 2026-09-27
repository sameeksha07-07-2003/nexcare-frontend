import {
    useEffect,
    useRef,
    useState,
} from "react"
import {
    ChevronDown,
    LogOut,
    Menu,
    Search,
    User2,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

import Avatar from "../common/Avatar"
import { useAuth } from "../../context/AuthContext"

function formatEmailName(email) {
    if (!email) {
        return ""
    }

    return email
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .map(
            (part) =>
                part.charAt(0).toUpperCase() +
                part.slice(1).toLowerCase(),
        )
        .join(" ")
}

function Topbar({
    onMenuClick,
    user,
}) {
    const {
        logout,
        user: authenticatedUser,
        role: authenticatedRole,
    } = useAuth()

    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] =
        useState(false)

    const menuRef = useRef(null)

    const roleLabel =
        authenticatedRole === "DOCTOR"
            ? "Doctor"
            : "Patient"

    const fallbackName =
        formatEmailName(
            authenticatedUser?.email,
        ) || roleLabel

    const profileName =
        user?.fullName || fallbackName

    const displayName =
        authenticatedRole === "DOCTOR" &&
        !profileName
            .toLowerCase()
            .startsWith("dr.")
            ? `Dr. ${profileName}`
            : profileName

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target,
                )
            ) {
                setMenuOpen(false)
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setMenuOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside,
        )

        document.addEventListener(
            "keydown",
            handleEscape,
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside,
            )

            document.removeEventListener(
                "keydown",
                handleEscape,
            )
        }
    }, [])

    function handleLogout() {
        setMenuOpen(false)
        logout()
        navigate("/login", {
            replace: true,
        })
    }

    function handleProfileNavigation() {
        setMenuOpen(false)
        navigate(
            authenticatedRole === "DOCTOR"
                ? "/doctor/profile"
                : "/profile",
        )
    }

    return (
        <header className="flex h-[64px] items-center gap-3 border-b border-[#DCEDEF] bg-white px-4 sm:h-[70px] sm:gap-4 sm:px-5 md:px-7">
            <button
                type="button"
                aria-label="Open navigation menu"
                onClick={onMenuClick}
                className="shrink-0 text-[#10273F] md:hidden"
            >
                <Menu
                    size={22}
                    aria-hidden="true"
                />
            </button>

            <div className="flex flex-1 items-center">
                {authenticatedRole === "PATIENT" && (
                    <button
                        type="button"
                        onClick={() => navigate("/doctors")}
                        className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-[#DCEDEF] bg-[#F2F9FA] px-3 py-2 text-left text-[13px] text-[#54708A] transition hover:border-[#0EA394]/40 hover:bg-[#EAF8F7] sm:px-4 sm:py-2.5 sm:text-[14px]"
                    >
                        <Search size={18} aria-hidden="true" />
                        <span className="truncate">
                            Find doctors, specialists, or services
                        </span>
                    </button>
                )}
            </div>

            <div
                className="relative shrink-0"
                ref={menuRef}
            >
                <button
                    type="button"
                    onClick={() =>
                        setMenuOpen(
                            (open) => !open,
                        )
                    }
                    className="flex items-center gap-2"
                    aria-label="Account menu"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                >
                    <Avatar
                        photoUrl={user?.avatarUrl}
                        role={authenticatedRole}
                        gender={user?.gender}
                        name={displayName}
                        size="sm"
                    />

                    <span className="hidden text-left leading-tight sm:block">
                        <span className="block max-w-44 truncate text-[14px] font-semibold text-[#10273F]">
                            {displayName}
                        </span>

                        <span className="block text-[12px] text-[#54708A]">
                            {roleLabel}
                        </span>
                    </span>

                    <ChevronDown
                        size={16}
                        className={[
                            "hidden text-[#54708A]",
                            "transition-transform",
                            "sm:block",
                            menuOpen
                                ? "rotate-180"
                                : "",
                        ].join(" ")}
                        aria-hidden="true"
                    />
                </button>

                {menuOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-[#DCEDEF] bg-white shadow-[0_12px_28px_rgba(16,39,63,0.12)]"
                    >
                        <div className="flex items-center gap-3 border-b border-[#EEF4F6] px-4 py-3">
                            <Avatar
                                photoUrl={
                                    user?.avatarUrl
                                }
                                role={authenticatedRole}
                                gender={user?.gender}
                                name={displayName}
                                size="md"
                            />

                            <div className="min-w-0">
                                <p className="truncate text-[14px] font-semibold text-[#10273F]">
                                    {displayName}
                                </p>

                                <p className="truncate text-[12px] text-[#54708A]">
                                    {roleLabel}
                                </p>
                            </div>
                        </div>

                        <div className="py-1.5">
                            {(authenticatedRole === "PATIENT" ||
                                authenticatedRole === "DOCTOR") && (
                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={
                                        handleProfileNavigation
                                    }
                                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[14px] font-medium text-[#10273F] transition-colors hover:bg-[#F2F9FA]"
                                >
                                    <User2
                                        size={17}
                                        aria-hidden="true"
                                    />
                                    My Profile
                                </button>
                            )}

                            <button
                                type="button"
                                role="menuitem"
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50"
                            >
                                <LogOut
                                    size={17}
                                    aria-hidden="true"
                                />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Topbar
