import {
    ArrowUp,
    HeartPulse,
    ShieldCheck,
    Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const exploreLinks = [
    { label: "Home", to: "/" },
    { label: "Find a Doctor", to: "/doctors" },
];

const accountLinks = [
    { label: "Log In", to: "/login" },
    { label: "Create Account", to: "/signup" },
];

function HomeFooter() {
    const currentYear = new Date().getFullYear();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <footer className="relative overflow-hidden bg-[#071F3F] text-white">
            {/* Decorative background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#0EA5A5]/10 blur-3xl"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#38CFCB]/10 blur-3xl"
            />

            <div className="relative mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1fr] lg:gap-12 lg:py-16">
                    {/* Brand information */}
                    <div className="max-w-md">
                        <Link
                            to="/"
                            aria-label="Go to NexCare homepage"
                            className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38CFCB]/30"
                        >
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0EA5A5] shadow-[0_8px_24px_rgba(14,165,165,0.25)]">
                                <HeartPulse
                                    aria-hidden="true"
                                    className="h-6 w-6 text-white"
                                    strokeWidth={2}
                                />
                            </span>

                            <span className="text-2xl font-bold tracking-[-0.03em]">
                                Nex<span className="text-[#38CFCB]">Care</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#B8CBE0]">
                            Making healthcare discovery and management simpler,
                            clearer, and more accessible for everyone.
                        </p>

                        <div className="mt-5 flex items-start gap-3 text-sm text-[#B8CBE0]">
                            <ShieldCheck
                                aria-hidden="true"
                                className="mt-0.5 h-5 w-5 shrink-0 text-[#38CFCB]"
                                strokeWidth={1.8}
                            />

                            <span>
                                Designed with clarity, trust, and patient
                                convenience in mind.
                            </span>
                        </div>
                    </div>

                    {/* Explore links */}
                    <nav aria-labelledby="footer-explore-heading">
                        <h2
                            id="footer-explore-heading"
                            className="text-sm font-semibold uppercase tracking-[0.12em] text-white"
                        >
                            Explore
                        </h2>

                        <ul className="mt-5 space-y-3">
                            {exploreLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="inline-flex rounded text-sm text-[#B8CBE0] transition-colors duration-200 hover:text-[#38CFCB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38CFCB]/50"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Account links */}
                    <nav aria-labelledby="footer-account-heading">
                        <h2
                            id="footer-account-heading"
                            className="text-sm font-semibold uppercase tracking-[0.12em] text-white"
                        >
                            Account
                        </h2>

                        <ul className="mt-5 space-y-3">
                            {accountLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="inline-flex rounded text-sm text-[#B8CBE0] transition-colors duration-200 hover:text-[#38CFCB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38CFCB]/50"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Healthcare note */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Stethoscope
                                aria-hidden="true"
                                className="h-5 w-5 text-[#38CFCB]"
                                strokeWidth={1.8}
                            />

                            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
                                Important
                            </h2>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-[#B8CBE0]">
                            NexCare supports healthcare discovery and
                            management. It is not a replacement for emergency
                            medical services.
                        </p>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-[#91A9C1] sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        &copy; {currentYear} NexCare. All rights reserved.
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Scroll back to the top of the page"
                        className="inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 font-medium text-[#B8CBE0] transition-colors duration-200 hover:bg-white/5 hover:text-[#38CFCB] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38CFCB]/20"
                    >
                        Back to top

                        <ArrowUp
                            aria-hidden="true"
                            className="h-4 w-4"
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default HomeFooter;