import { Link } from 'react-router-dom';
import {
    Activity,
    ArrowRight,
    CalendarCheck,
    Leaf,
    LockKeyhole,
    Plus,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react';

import heroCareImage from '../../assets/images/home-hero-care.webp';

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#F9FEFF] via-[#F4FCFD] to-[#EAFBFC] lg:h-[calc(100svh-72px)]">
            <div className="mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-screen-2xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:h-full lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-6 xl:px-12 2xl:px-16">

                {/* Left side: hero content */}
                <div className="relative z-20 max-w-2xl">
                    <p className="nc-reveal nc-delay-1 mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#0EA5A5] sm:text-sm">
                        Smarter care. Healthier you.
                    </p>

                    <h1 className="nc-reveal nc-delay-2 text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0B2D5C] sm:text-5xl lg:text-6xl 2xl:text-7xl">
                        Your Health,
                        <span className="block text-[#0EA5A5]">
                            Our Priority.
                        </span>
                    </h1>

                    <p className="nc-reveal nc-delay-3 mt-5 max-w-xl text-base leading-7 text-[#52789E] sm:text-lg sm:leading-8 lg:mt-6">
                        Understand your symptoms, discover trusted doctors, and
                        take the next step toward better health—all in one
                        place.
                    </p>

                    {/* Hero actions */}
                    <div className="nc-reveal nc-delay-4 mt-7 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
                        <Link
                            to="/doctors"
                            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0EA5A5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0B8F90] hover:shadow-md active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5A5]"
                        >
                            Explore Doctors

                            <ArrowRight
                                size={18}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                            />
                        </Link>

                        <Link
                            to="/symptom-checker"
                            className="inline-flex active:scale-[0.98] min-h-12 items-center justify-center gap-2 rounded-xl border border-[#0EA5A5] bg-white px-6 py-3 text-sm font-semibold text-[#0B7778] transition-colors duration-200 hover:bg-[#ECFBFA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5A5]"
                        >
                            <Stethoscope size={18} aria-hidden="true" />
                            Check Symptoms
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="nc-reveal nc-delay-5 mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#D8ECEF] pt-6 text-sm text-[#456B8F]">
                        <div className="flex items-center gap-2">
                            <ShieldCheck
                                size={19}
                                className="shrink-0 text-[#0EA5A5]"
                                aria-hidden="true"
                            />
                            <span>Verified doctors</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarCheck
                                size={19}
                                className="shrink-0 text-[#0EA5A5]"
                                aria-hidden="true"
                            />
                            <span>Simple booking</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <LockKeyhole
                                size={19}
                                className="shrink-0 text-[#0EA5A5]"
                                aria-hidden="true"
                            />
                            <span>Secure experience</span>
                        </div>
                    </div>
                </div>

                {/* Right side: doctor and patient visual */}
                <div className="nc-visual-reveal relative mx-auto flex min-h-[440px] w-full max-w-3xl items-end justify-center sm:min-h-[520px] lg:h-[calc(100svh-110px)] lg:min-h-0 lg:max-h-[690px] lg:justify-end short:max-h-[540px]">

                    {/* Soft background glow */}
                    <div
                        className="pointer-events-none absolute inset-x-[3%] bottom-[3%] top-[10%] rounded-[46%_54%_48%_52%/42%_46%_54%_58%] bg-gradient-to-br from-[#CFF8F6] via-[#AEEFF2] to-[#67D8E4]"
                        aria-hidden="true"
                    />

                    <div
                        className="pointer-events-none absolute right-[2%] top-[5%] h-40 w-40 rounded-full bg-white/45 blur-2xl"
                        aria-hidden="true"
                    />

                    {/* ECG decoration */}
                    <Activity
                        className="nc-ecg-pulse pointer-events-none absolute left-[8%] top-[27%] hidden h-20 w-20 text-white/75 sm:block"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                    {/* Medical plus decorations */}
                    <Plus
                        className="nc-icon-drift pointer-events-none absolute right-[8%] top-[17%] hidden h-12 w-12 text-[#0EA5A5]/35 sm:block"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <Plus
                        className="nc-icon-drift-reverse pointer-events-none absolute left-[20%] top-[15%] hidden h-8 w-8 text-white/70 sm:block"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <Plus
                        className="nc-icon-drift nc-delay-3 pointer-events-none absolute right-[18%] top-[35%] hidden h-7 w-7 text-white/60 lg:block"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    {/* Leaf decorations */}
                    <Leaf
                        className="pointer-events-none absolute bottom-[4%] left-[3%] hidden h-20 w-20 -rotate-12 text-[#0EA5A5]/25 sm:block"
                        strokeWidth={1.3}
                        aria-hidden="true"
                    />

                    <Leaf
                        className="pointer-events-none absolute bottom-[5%] right-[1%] hidden h-24 w-24 rotate-12 text-[#0EA5A5]/20 sm:block"
                        strokeWidth={1.3}
                        aria-hidden="true"
                    />

                    {/* Doctor and patient */}
                    <img
                        src={heroCareImage}
                        alt="A NexCare doctor speaking with a patient"
                        width="1374"
                        height="1145"
                        fetchPriority="high"
                        decoding="async"
                        className="relative z-10 max-h-[520px] w-auto max-w-full object-contain sm:max-h-[590px] lg:max-h-[calc(100svh-125px)] short:max-h-[500px]"
                    />

                    {/* Trusted Care card */}
                    <div className="nc-float absolute right-[1%] top-[1%] z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:flex">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2F9F7] text-[#0EA5A5]">
                            <ShieldCheck size={21} aria-hidden="true" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#0B2D5C]">
                                Trusted Care
                            </p>
                            <p className="text-xs text-[#52789E]">
                                Verified professionals
                            </p>
                        </div>
                    </div>

                    {/* Easy Booking card */}
                    <div className="nc-float-reverse absolute  bottom-[6%] left-[1%] z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:flex">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2F9F7] text-[#0EA5A5]">
                            <CalendarCheck size={21} aria-hidden="true" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#0B2D5C]">
                                Easy Booking
                            </p>
                            <p className="text-xs text-[#52789E]">
                                Care without complexity
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
