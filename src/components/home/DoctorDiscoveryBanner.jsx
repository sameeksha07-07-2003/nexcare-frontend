import { Link } from 'react-router-dom';
import {
    ArrowRight,
    BadgeCheck,
    MapPin,
    Plus,
    Search,
} from 'lucide-react';

import doctorTeamImage from '../../assets/images/doctor-discovery-team.webp';

function DoctorDiscoveryBanner() {
    return (
        <section
            id='find-doctor'
            aria-labelledby="doctor-discovery-heading"
            className="overflow-hidden bg-[#F5FCFD] py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                <div className="relative overflow-hidden rounded-[32px] border border-[#CDEBED] bg-gradient-to-br from-[#E8FBFA] via-white to-[#D9F6F7] shadow-[0_20px_60px_rgba(11,45,92,0.08)]">
                    
                    {/* Decorative background shapes */}
                    <div
                        className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#B9EFED]/50 blur-3xl"
                        aria-hidden="true"
                    />

                    <div
                        className="pointer-events-none absolute -bottom-24 right-[28%] h-72 w-72 rounded-full bg-[#86E1E6]/30 blur-3xl"
                        aria-hidden="true"
                    />

                    <Plus
                        className="nc-icon-drift pointer-events-none absolute left-[47%] top-[15%] hidden h-9 w-9 text-[#0EA5A5]/30 lg:block"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <Plus
                        className="nc-icon-drift-reverse pointer-events-none absolute right-[4%] top-[12%] hidden h-12 w-12 text-[#0EA5A5]/25 sm:block"
                        strokeWidth={1.8}
                        aria-hidden="true"
                    />

                    <div className="relative z-10 grid items-center gap-8 px-6 pb-0 pt-10 sm:px-10 sm:pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-14 xl:px-16">
                        
                        {/* Banner content */}
                        <div className="max-w-2xl pb-10 lg:pb-0">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5A5] sm:text-sm">
                                Trusted care starts here
                            </p>

                            <h2
                                id="doctor-discovery-heading"
                                className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2D5C] sm:text-4xl lg:text-5xl"
                            >
                                Find the right doctor for you.
                            </h2>

                            <p className="mt-5 max-w-xl text-base leading-7 text-[#52789E] sm:text-lg sm:leading-8">
                                Browse verified doctors based on specialization,
                                qualification, experience, and city—even before
                                creating an account.
                            </p>

                            {/* Discovery highlights */}
                            <div className="mt-7 flex flex-col gap-3 text-sm text-[#385F83] sm:flex-row sm:flex-wrap sm:gap-x-6">
                                <div className="flex items-center gap-2">
                                    <Search
                                        size={18}
                                        className="shrink-0 text-[#0EA5A5]"
                                        aria-hidden="true"
                                    />
                                    <span>Search by specialization</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin
                                        size={18}
                                        className="shrink-0 text-[#0EA5A5]"
                                        aria-hidden="true"
                                    />
                                    <span>Discover doctors by city</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <BadgeCheck
                                        size={18}
                                        className="shrink-0 text-[#0EA5A5]"
                                        aria-hidden="true"
                                    />
                                    <span>Approved doctors only</span>
                                </div>
                            </div>

                            {/* Primary action */}
                            <div className="mt-8">
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

                                <p className="mt-3 text-xs leading-5 text-[#6484A1]">
                                    No account is required to browse doctors.
                                    Sign in only when you are ready to confirm
                                    an appointment.
                                </p>
                            </div>
                        </div>

                        {/* Doctor team visual */}
                        <div className="relative mx-auto flex min-h-[310px] w-full max-w-3xl items-end justify-center sm:min-h-[400px] lg:min-h-[440px]">
                            <div
                                className="pointer-events-none absolute inset-x-[8%] bottom-0 top-[10%] rounded-[48%_52%_42%_58%/45%_42%_58%_55%] bg-gradient-to-br from-[#BDEFED] to-[#74D9E2]"
                                aria-hidden="true"
                            />

                            <img
                                src={doctorTeamImage}
                                alt="Three NexCare doctors from different medical specialties"
                                width="1536"
                                height="1024"
                                loading="lazy"
                                decoding="async"
                                className="relative z-10 max-h-[460px] w-auto max-w-full object-contain"
                            />

                            {/* Verification badge */}
                            <div className="nc-float absolute bottom-[10%] right-[2%] z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:flex">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E2F9F7] text-[#0EA5A5]">
                                    <BadgeCheck
                                        size={21}
                                        aria-hidden="true"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#0B2D5C]">
                                        Verified Doctors
                                    </p>

                                    <p className="text-xs text-[#52789E]">
                                        Trusted professional care
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DoctorDiscoveryBanner;
