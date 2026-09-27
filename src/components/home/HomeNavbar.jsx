import {
    ChevronDown,
    LayoutDashboard,
    LogOut,
    Menu,
    UserRound,
    X,
} from "lucide-react"
import {
    useEffect,
    useRef,
    useState,
} from "react"
import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom"

import nexcareLogo from "../../assets/logo/nexcare-logo.svg"
import { useAuth } from "../../context/AuthContext"
import { useProfile } from "../../context/ProfileContext"

function getInitials(name, email) {
    if (name) {
        const words = name.trim().split(/\s+/)

        return words
            .slice(0, 2)
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
    }

    return email?.charAt(0)?.toUpperCase() || "U"
}

function getFallbackName(email) {
    if (!email) {
        return "My Account"
    }

    const emailName = email.split("@")[0]

    return emailName
        .split(/[._-]/)
        .filter(Boolean)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1),
        )
        .join(" ")
}

function formatRole(role) {
    if (!role) {
        return "User"
    }

    const normalizedRole = role.replace(
        /^ROLE_/,
        "",
    )

    return (
        normalizedRole.charAt(0).toUpperCase() +
        normalizedRole.slice(1).toLowerCase()
    )
}

function AccountAvatar({
    avatarUrl,
    accountName,
    email,
    size = "medium",
}) {
    const [imageFailed, setImageFailed] =
        useState(false)

    const sizeClasses =
        size === "large"
            ? "h-12 w-12 text-sm"
            : "h-10 w-10 text-xs"

    if (!avatarUrl || imageFailed) {
        return (
            <span
                className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[#DDF7F4] font-bold text-[#087D78] ${sizeClasses}`}
                aria-hidden="true"
            >
                {getInitials(accountName, email)}
            </span>
        )
    }

    return (
        <img
            src={avatarUrl}
            alt=""
            className={`shrink-0 rounded-full border border-[#DDEFF2] object-cover ${sizeClasses}`}
            onError={() => setImageFailed(true)}
        />
    )
}

function HomeNavbar() {
    const navigate = useNavigate()

    const {
        user,
        role,
        isAuthenticated,
        logout,
    } = useAuth()

    const { profile } = useProfile()

    const [isMenuOpen, setIsMenuOpen] =
        useState(false)

    const [
        isAccountMenuOpen,
        setIsAccountMenuOpen,
    ] = useState(false)

    const accountMenuRef = useRef(null)

    const accountName =
        profile?.fullName ||
        getFallbackName(user?.email)

    const accountEmail =
        profile?.email || user?.email || ""

    const accountRole =
        profile?.role || formatRole(role)

    const avatarUrl = profile?.avatarUrl || null

    const dashboardPath =
        role === "DOCTOR" ? "/doctor" : "/dashboard"

    const profilePath =
        role === "DOCTOR" ? "/doctor/profile" : "/profile"

    useEffect(() => {
        if (!isAccountMenuOpen) {
            return undefined
        }

        function handleOutsideClick(event) {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(
                    event.target,
                )
            ) {
                setIsAccountMenuOpen(false)
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsAccountMenuOpen(false)
            }
        }

        document.addEventListener(
            "mousedown",
            handleOutsideClick,
        )

        window.addEventListener(
            "keydown",
            handleEscape,
        )

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick,
            )

            window.removeEventListener(
                "keydown",
                handleEscape,
            )
        }
    }, [isAccountMenuOpen])

    function closeMenu() {
        setIsMenuOpen(false)
        setIsAccountMenuOpen(false)
    }

    function handleLogout() {
        closeMenu()
        logout()
        navigate("/", { replace: true })
    }

    function getNavLinkClasses({ isActive }) {
        const baseClasses =
            "relative py-2 text-sm font-medium transition-colors duration-200"

        return isActive
            ? `${baseClasses} text-[#0EA5A5]`
            : `${baseClasses} text-[#385574] hover:text-[#0EA5A5]`
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[#DDEFF2] bg-white/95 backdrop-blur">
            <nav
                className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10 xl:px-12 2xl:px-16"
                aria-label="Primary navigation"
            >
                <Link
                    to="/"
                    onClick={closeMenu}
                    aria-label="Go to NexCare homepage"
                    className="shrink-0"
                >
                    <img
                        src={nexcareLogo}
                        alt="NexCare"
                        className="h-11 w-auto sm:h-12"
                    />
                </Link>

                {/* Desktop navigation */}
                <div className="hidden items-center gap-8 lg:flex">
                    <NavLink
                        to="/"
                        end
                        className={getNavLinkClasses}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/doctors"
                        className={getNavLinkClasses}
                    >
                        Find Doctors
                    </NavLink>

                    <a
                        href="/#features"
                        className="py-2 text-sm font-medium text-[#385574] transition-colors duration-200 hover:text-[#0EA5A5]"
                    >
                        Features
                    </a>

                    <a
                        href="/#future-scope"
                        className="py-2 text-sm font-medium text-[#385574] transition-colors duration-200 hover:text-[#0EA5A5]"
                    >
                        Future Scope
                    </a>

                    <a
                        href="/#about"
                        className="py-2 text-sm font-medium text-[#385574] transition-colors duration-200 hover:text-[#0EA5A5]"
                    >
                        About Us
                    </a>
                </div>

                {/* Desktop guest actions */}
                {!isAuthenticated && (
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            to="/login"
                            className="rounded-xl border border-[#0EA5A5] px-5 py-2.5 text-sm font-semibold text-[#0B7778] transition-colors duration-200 hover:bg-[#ECFBFA]"
                        >
                            Log In
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-xl bg-[#0EA5A5] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#0B8F90]"
                        >
                            Get Started
                        </Link>
                    </div>
                )}

                {/* Desktop authenticated account */}
                {isAuthenticated && (
                    <div
                        ref={accountMenuRef}
                        className="relative hidden lg:block"
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setIsAccountMenuOpen(
                                    (current) =>
                                        !current,
                                )
                            }
                            className="flex min-w-[190px] items-center gap-3 rounded-2xl border border-transparent px-2.5 py-1.5 text-left transition-colors hover:border-[#DDEFF2] hover:bg-[#F3FBFA]"
                            aria-label="Open account menu"
                            aria-haspopup="menu"
                            aria-expanded={
                                isAccountMenuOpen
                            }
                        >
                            <AccountAvatar
                                key={avatarUrl || accountEmail}
                                avatarUrl={avatarUrl}
                                accountName={accountName}
                                email={accountEmail}
                            />

                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-[#0B2D5C]">
                                    {accountName}
                                </span>

                                <span className="block text-xs text-[#64809B]">
                                    {accountRole}
                                </span>
                            </span>

                            <ChevronDown
                                className={`h-4 w-4 shrink-0 text-[#54708A] transition-transform ${
                                    isAccountMenuOpen
                                        ? "rotate-180"
                                        : ""
                                }`}
                                aria-hidden="true"
                            />
                        </button>

                        {isAccountMenuOpen && (
                            <div
                                role="menu"
                                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-[#DDEFF2] bg-white p-2 shadow-[0_18px_50px_rgba(16,39,63,0.16)]"
                            >
                                <div className="border-b border-[#E6F1F3] px-3 py-3">
                                    <p className="truncate text-sm font-semibold text-[#0B2D5C]">
                                        {accountName}
                                    </p>

                                    <p className="mt-0.5 truncate text-xs text-[#64809B]">
                                        {accountEmail}
                                    </p>
                                </div>

                                <Link
                                    to={dashboardPath}
                                    onClick={closeMenu}
                                    role="menuitem"
                                    className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#385574] transition-colors hover:bg-[#ECFBFA] hover:text-[#087D78]"
                                >
                                    <LayoutDashboard
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Dashboard
                                </Link>

                                <Link
                                    to={profilePath}
                                    onClick={closeMenu}
                                    role="menuitem"
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#385574] transition-colors hover:bg-[#ECFBFA] hover:text-[#087D78]"
                                >
                                    <UserRound
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    My Profile
                                </Link>

                                <div className="my-2 border-t border-[#E6F1F3]" />

                                <button
                                    type="button"
                                    role="menuitem"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                                >
                                    <LogOut
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Mobile menu button */}
                <button
                    type="button"
                    onClick={() => {
                        setIsMenuOpen(
                            (current) => !current,
                        )
                        setIsAccountMenuOpen(false)
                    }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#0B2D5C] transition-colors hover:bg-[#ECFBFA] lg:hidden"
                    aria-label={
                        isMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu"
                    }
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                >
                    {isMenuOpen ? (
                        <X
                            size={24}
                            aria-hidden="true"
                        />
                    ) : (
                        <Menu
                            size={24}
                            aria-hidden="true"
                        />
                    )}
                </button>
            </nav>

            {/* Mobile navigation */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-[#DDEFF2] bg-white px-4 pb-5 pt-3 sm:px-6 lg:hidden"
                >
                    <div className="flex flex-col gap-1">
                        <NavLink
                            to="/"
                            end
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#0EA5A5]"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/doctors"
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#0EA5A5]"
                        >
                            Find Doctors
                        </NavLink>

                        <a
                            href="/#features"
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#0EA5A5]"
                        >
                            Features
                        </a>

                        <a
                            href="/#future-scope"
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#0EA5A5]"
                        >
                            Future Scope
                        </a>

                        <a
                            href="/#about"
                            onClick={closeMenu}
                            className="rounded-lg px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#0EA5A5]"
                        >
                            About Us
                        </a>
                    </div>

                    {!isAuthenticated ? (
                        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#DDEFF2] pt-4">
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="rounded-xl border border-[#0EA5A5] px-4 py-2.5 text-center text-sm font-semibold text-[#0B7778]"
                            >
                                Log In
                            </Link>

                            <Link
                                to="/signup"
                                onClick={closeMenu}
                                className="rounded-xl bg-[#0EA5A5] px-4 py-2.5 text-center text-sm font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-4 border-t border-[#DDEFF2] pt-4">
                            <div className="flex items-center gap-3 rounded-2xl bg-[#F3FBFA] p-3">
                                <AccountAvatar
                                    key={
                                        avatarUrl ||
                                        accountEmail
                                    }
                                    avatarUrl={avatarUrl}
                                    accountName={accountName}
                                    email={accountEmail}
                                    size="large"
                                />

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-[#0B2D5C]">
                                        {accountName}
                                    </p>

                                    <p className="truncate text-xs text-[#64809B]">
                                        {accountRole}
                                        {accountEmail
                                            ? ` · ${accountEmail}`
                                            : ""}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 grid gap-2">
                                <Link
                                    to={dashboardPath}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#087D78]"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>

                                <Link
                                    to={profilePath}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[#385574] hover:bg-[#ECFBFA] hover:text-[#087D78]"
                                >
                                    <UserRound className="h-4 w-4" />
                                    My Profile
                                </Link>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}

export default HomeNavbar
