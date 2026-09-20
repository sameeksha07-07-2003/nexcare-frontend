import doctorPatientImage from '../../assets/images/doctor-patient.png';
import nexcareLogo from '../../assets/logo/nexcare-logo.svg';

function LoginHero() {
    return (
        <section
            // Removed rigid negative percentages (-80%)
            // Using fluid bg-center and shifting slightly right on smaller laptops
            className="relative flex flex-col justify-between h-full overflow-hidden px-8 lg:px-10 py-10 xl:px-16 bg-cover bg-no-repeat bg-[position:65%_center] xl:bg-center"
            style={{
                backgroundImage: `url(${doctorPatientImage})`,
            }}
        >
            {/* Gradient overlay for text readability */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, rgba(239,252,253,0.9) 1%, rgba(239,252,253,0.9) 35%, rgba(239,252,253,0.2) 60%, rgba(239,252,253,0) 100%)',
                }}
            />

            {/* Logo */}
            <div className="relative z-10">
                <img
                    src={nexcareLogo}
                    alt="NexCare"
                    className="h-12 xl:h-16 w-auto"
                />
            </div>

            {/* Heading + description + features */}
            <div className="relative z-10 mt-8 max-w-[480px]">

                <h1 className="text-4xl xl:text-[56px] font-extrabold leading-[1.05] tracking-tight text-[#0B2D5C]">
                    Your Health
                    <br />
                    <span className="text-[#10A9A5]">Our Priority</span>
                </h1>

                <p className="mt-6 max-w-[380px] text-base xl:text-lg leading-7 text-[#47719D]">
                    Book appointments, manage your profile,
                    and get quality healthcare — all in one place.
                </p>

                <div className="mt-6 xl:mt-8 space-y-4 xl:space-y-5">
                    {/* Feature 1 */}
                    <div className="flex items-center gap-4">
                        <div className="flex shrink-0 h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-full border border-cyan-200 bg-white/70 backdrop-blur">
                            <svg className="w-5 h-5 text-[#0BA5A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-sm xl:text-base text-[#0B2D5C]">Trusted Care</p>
                            <p className="text-xs xl:text-sm text-[#5B82AA]">Verified & experienced doctors</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-4">
                        <div className="flex shrink-0 h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-full border border-cyan-200 bg-white/70 backdrop-blur">
                            <svg className="w-5 h-5 text-[#0BA5A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-sm xl:text-base text-[#0B2D5C]">Easy Booking</p>
                            <p className="text-xs xl:text-sm text-[#5B82AA]">Book appointments in minutes</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-4">
                        <div className="flex shrink-0 h-10 w-10 xl:h-12 xl:w-12 items-center justify-center rounded-full border border-cyan-200 bg-white/70 backdrop-blur">
                            <svg className="w-5 h-5 text-[#0BA5A8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-sm xl:text-base text-[#0B2D5C]">Better Health</p>
                            <p className="text-xs xl:text-sm text-[#5B82AA]">Your wellness, our mission</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section with handwritten text & stats */}
            <div className="relative z-10 mt-auto">
                <p
                    className="mt-4 mb-2 text-xl xl:text-2xl text-[#0FA8A0] -rotate-3 w-fit"
                    style={{ fontFamily: "'Segoe Script', 'Brush Script MT', cursive" }}
                >
                    Healthcare Made Simple <span className="inline-block">♡</span>
                </p>

                <div className="flex items-center gap-4 xl:gap-8 rounded-2xl border border-white/70 bg-white/45 px-4 xl:px-8 py-3 xl:py-4 backdrop-blur-md w-fit mt-2">
                    <div>
                        <p className="text-lg xl:text-xl font-bold text-[#0B2D5C]">10K+</p>
                        <p className="text-xs xl:text-sm text-[#52789E]">Happy Patients</p>
                    </div>
                    <div className="h-8 xl:h-10 w-px bg-[#9CCDD5]" />
                    <div>
                        <p className="text-lg xl:text-xl font-bold text-[#0B2D5C]">500+</p>
                        <p className="text-xs xl:text-sm text-[#52789E]">Verified Doctors</p>
                    </div>
                    <div className="h-8 xl:h-10 w-px bg-[#9CCDD5]" />
                    <div>
                        <p className="text-lg xl:text-xl font-bold text-[#0B2D5C]">4.8/5</p>
                        <p className="text-xs xl:text-sm text-[#52789E]">Patient Satisfaction</p>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default LoginHero;