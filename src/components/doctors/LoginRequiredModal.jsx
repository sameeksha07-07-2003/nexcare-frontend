import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
    LockKeyhole,
    LogIn,
    UserPlus,
    X,
} from "lucide-react"

export default function LoginRequiredModal({
    isOpen,
    onClose,
}) {
    const location = useLocation()

    useEffect(() => {
        if (!isOpen) {
            return undefined
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener(
            "keydown",
            handleEscape,
        )

        const previousOverflow =
            document.body.style.overflow

        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener(
                "keydown",
                handleEscape,
            )

            document.body.style.overflow =
                previousOverflow
        }
    }, [isOpen, onClose])

    if (!isOpen) {
        return null
    }

    const returnLocation = {
        pathname: location.pathname,
        search: location.search,
    }

    return (
        <div
            className="
                fixed inset-0 z-[100] flex items-center
                justify-center bg-nexcare-navy/45
                px-4 backdrop-blur-sm
            "
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-required-title"
                className="
                    relative w-full max-w-md rounded-3xl
                    border border-white/70 bg-white p-6
                    shadow-[0_30px_90px_rgba(16,39,63,0.28)]
                    sm:p-8
                "
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="
                        absolute right-4 top-4 inline-flex
                        h-10 w-10 items-center justify-center
                        rounded-full text-nexcare-textSecondary
                        transition hover:bg-slate-100
                        hover:text-nexcare-navy
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-nexcare-teal
                    "
                    aria-label="Close dialog"
                >
                    <X
                        className="h-5 w-5"
                        aria-hidden="true"
                    />
                </button>

                <div
                    className="
                        flex h-14 w-14 items-center
                        justify-center rounded-full
                        bg-nexcare-tealLight
                        text-nexcare-teal
                    "
                >
                    <LockKeyhole
                        className="h-7 w-7"
                        aria-hidden="true"
                    />
                </div>

                <h2
                    id="login-required-title"
                    className="
                        mt-5 font-heading text-2xl font-bold
                        text-nexcare-navy
                    "
                >
                    Sign in to confirm your appointment
                </h2>

                <p
                    className="
                        mt-3 text-sm leading-6
                        text-nexcare-textSecondary
                    "
                >
                    You can browse doctors and availability
                    without an account. We only require sign-in
                    when confirming an appointment.
                </p>

                <div className="mt-7 space-y-3">
                    <Link
                        to="/login"
                        state={{ from: returnLocation }}
                        className="
                            inline-flex min-h-12 w-full
                            items-center justify-center gap-2
                            rounded-xl bg-nexcare-teal
                            px-5 py-2.5 text-sm font-semibold
                            text-white transition
                            hover:bg-nexcare-tealDark
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-nexcare-teal
                            focus-visible:ring-offset-2
                        "
                    >
                        <LogIn
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        Log In
                    </Link>

                    <Link
                        to="/signup"
                        state={{ from: returnLocation }}
                        className="
                            inline-flex min-h-12 w-full
                            items-center justify-center gap-2
                            rounded-xl border
                            border-nexcare-teal bg-white
                            px-5 py-2.5 text-sm font-semibold
                            text-nexcare-tealDark transition
                            hover:bg-nexcare-tealLight
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-nexcare-teal
                        "
                    >
                        <UserPlus
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        Create Free Account
                    </Link>
                </div>
            </div>
        </div>
    )
}