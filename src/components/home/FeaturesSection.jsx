import {
    CalendarCheck2,
    FileText,
    Search,
    Stethoscope,
} from 'lucide-react';

const AVAILABLE_FEATURES = [
    {
        id: 'symptom-checker',
        title: 'Symptom Checker',
        description:
            'Understand your symptoms and receive helpful guidance about what to do next.',
        icon: Stethoscope,
    },
    {
        id: 'find-doctors',
        title: 'Find Verified Doctors',
        description:
            'Browse approved doctors by city, specialization, qualification, and experience.',
        icon: Search,
    },
    {
        id: 'appointment-booking',
        title: 'Appointment Booking',
        description:
            'Choose a trusted doctor and continue securely to book your appointment.',
        icon: CalendarCheck2,
    },
    {
        id: 'medical-records',
        title: 'Medical Records',
        description:
            'Keep your prescriptions, reports, and important health history organized in one place.',
        icon: FileText,
    },
];

function FeaturesSection() {
    return (
        <section
            id="features"
            aria-labelledby="features-heading"
            className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5A5] sm:text-sm">
                        Available on NexCare
                    </p>

                    <h2
                        id="features-heading"
                        className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2D5C] sm:text-4xl lg:text-5xl"
                    >
                        Everything you need for a simpler care journey.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52789E] sm:text-lg">
                        Explore the tools already available to help you
                        understand your health, find trusted care, and manage
                        your healthcare journey.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
                    {AVAILABLE_FEATURES.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.id}
                                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#DCEFF1] bg-white p-6 shadow-[0_12px_35px_rgba(11,45,92,0.06)] transition duration-300 hover:border-[#9EDFE0] hover:shadow-[0_18px_45px_rgba(11,45,92,0.10)] motion-safe:hover:-translate-y-1 sm:p-7"
                            >
                                {/* Decorative card glow */}
                                <div
                                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#E4FAF8] opacity-70 transition-transform duration-300 motion-safe:group-hover:scale-125"
                                    aria-hidden="true"
                                />

                                {/* Feature icon */}
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4FAF8] text-[#0EA5A5]">
                                    <Icon
                                        size={27}
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3 className="relative mt-6 text-xl font-bold text-[#0B2D5C]">
                                    {feature.title}
                                </h3>

                                <p className="relative mt-3 flex-1 text-sm leading-6 text-[#52789E] sm:text-base">
                                    {feature.description}
                                </p>

                                {/* Availability status */}
                                <div className="relative mt-6">
                                    <span className="inline-flex items-center gap-2 rounded-full bg-[#E9FBF2] px-3 py-1.5 text-xs font-semibold text-[#168456]">
                                        <span
                                            className="h-2 w-2 rounded-full bg-[#22B573]"
                                            aria-hidden="true"
                                        />
                                        Available Now
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;