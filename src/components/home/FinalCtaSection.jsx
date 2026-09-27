import { ArrowRight, HeartPulse, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import finalCtaFamily from "../../assets/images/final-cta-family.webp";

function FinalCtaSection() {
    return (
        <section
            aria-labelledby="final-cta-heading"
            className="bg-white py-14 sm:py-16 lg:py-20"
        >
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                <div className="relative overflow-hidden rounded-[2rem] border border-[#BCECE9] bg-[#DDF8F7] shadow-[0_24px_70px_rgba(11,45,92,0.10)]">
                    {/* Background decorations */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/50 blur-2xl"
                    />

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-24 right-[35%] h-60 w-60 rounded-full bg-[#0EA5A5]/10 blur-3xl"
                    />

                    <HeartPulse
                        aria-hidden="true"
                        strokeWidth={1.4}
                        className="nc-icon-drift pointer-events-none absolute right-8 top-8 hidden h-12 w-12 text-[#0EA5A5]/15 sm:block"
                    />

                    <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
                        {/* CTA content */}
                        <div className="px-6 pb-4 pt-10 sm:px-10 sm:pt-12 lg:px-14 lg:py-14 xl:px-16">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0EA5A5]/20 bg-white/70 px-4 py-2 text-sm font-semibold text-[#087E7E]">
                                <HeartPulse
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                    strokeWidth={2}
                                />

                                Begin your care journey
                            </div>

                            <h2
                                id="final-cta-heading"
                                className="max-w-xl text-3xl font-bold leading-tight tracking-[-0.03em] text-[#0B2D5C] sm:text-4xl lg:text-[2.75rem]"
                            >
                                Take the next step toward better health.
                            </h2>

                            <p className="mt-5 max-w-lg text-base leading-7 text-[#52789E] sm:text-lg">
                                Start exploring NexCare today and manage your
                                healthcare journey with greater clarity and
                                confidence.
                            </p>

                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link
                                    to="/signup"
                                    className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0B2D5C] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(11,45,92,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#103A73] hover:shadow-[0_16px_34px_rgba(11,45,92,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0B2D5C]/20"
                                >
                                    Create Free Account

                                    <ArrowRight
                                        aria-hidden="true"
                                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                        strokeWidth={2}
                                    />
                                </Link>

                                <Link
                                    to="/doctors"
                                    className="inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-[#087E7E] transition-colors duration-300 hover:bg-white/60 hover:text-[#066B6B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA5A5]/20"
                                >
                                    Explore Doctors
                                </Link>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm text-[#52789E]">
                                <ShieldCheck
                                    aria-hidden="true"
                                    className="h-4 w-4 shrink-0 text-[#0EA5A5]"
                                    strokeWidth={2}
                                />

                                <span>
                                    Free to explore. Sign in only when needed.
                                </span>
                            </div>
                        </div>

                        {/* Family image */}
                        <div className="relative flex min-h-[280px] items-end justify-center self-end sm:min-h-[360px] lg:min-h-[430px]">
                            <div
                                aria-hidden="true"
                                className="absolute bottom-4 right-8 h-[75%] w-[75%] rounded-full bg-white/35 blur-3xl"
                            />

                            <img
                                src={finalCtaFamily}
                                alt="A family using NexCare together on a laptop"
                                loading="lazy"
                                decoding="async"
                                width="1536"
                                height="1024"
                                className="relative z-10 w-full max-w-[760px] object-contain object-bottom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FinalCtaSection;
