import {
    Bot,
    Plus,
    Sprout,
    UsersRound,
    Video,
} from 'lucide-react';

const FUTURE_FEATURES = [
    {
        id: 'personalized-routine',
        title: 'Personalized Routine',
        description:
            'Receive customized wellness, exercise, and daily-care recommendations.',
        icon: Sprout,
    },
    {
        id: 'community-forum',
        title: 'Community Forum',
        description:
            'Join supportive discussions, share experiences, and learn together.',
        icon: UsersRound,
    },
    {
        id: 'ai-health-assistant',
        title: 'AI Health Assistant',
        description:
            'Access general health information and guidance through an intelligent assistant.',
        icon: Bot,
    },
    {
        id: 'telemedicine',
        title: 'Telemedicine',
        description:
            'Connect remotely with healthcare professionals through secure consultations.',
        icon: Video,
    },
];

function FutureScopeSection() {
    return (
        <section
            id="future-scope"
            aria-labelledby="future-scope-heading"
            className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#062A47] via-[#073C55] to-[#05656D] py-16 sm:py-20 lg:py-24"
        >
            {/* Background decorations */}
            <div
                className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#0EA5A5]/15 blur-3xl"
                aria-hidden="true"
            />

            <div
                className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#42D8DE]/15 blur-3xl"
                aria-hidden="true"
            />

            <Plus
                className="nc-icon-drift pointer-events-none absolute left-[7%] top-[18%] hidden h-10 w-10 text-white/20 sm:block"
                strokeWidth={1.5}
                aria-hidden="true"
            />

            <Plus
                className="nc-icon-drift-reverse pointer-events-none absolute bottom-[15%] right-[8%] hidden h-14 w-14 text-[#6FE3E5]/25 sm:block"
                strokeWidth={1.5}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#70E0DF] sm:text-sm">
                        Coming next
                    </p>

                    <h2
                        id="future-scope-heading"
                        className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
                    >
                        The future of connected healthcare.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#B9D8E3] sm:text-lg sm:leading-8">
                        We are thoughtfully expanding NexCare to support more
                        of your healthcare journey while keeping the experience
                        simple, secure, and accessible.
                    </p>
                </div>

                {/* Future-feature cards */}
                <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
                    {FUTURE_FEATURES.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.id}
                                className="group flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.07] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.12)] backdrop-blur-sm transition duration-300 hover:border-[#70E0DF]/45 hover:bg-white/[0.11] motion-safe:hover:-translate-y-1 sm:p-7"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#6FE3E5]/15 text-[#79EBE7] ring-1 ring-white/10">
                                        <Icon
                                            size={27}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <span className="rounded-full border border-[#70E0DF]/25 bg-[#70E0DF]/10 px-3 py-1.5 text-xs font-semibold text-[#9AF2EE]">
                                        Coming Soon
                                    </span>
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-6 text-[#B9D8E3] sm:text-base">
                                    {feature.description}
                                </p>
                            </article>
                        );
                    })}
                </div>

                {/* Scope clarification */}
                <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-center backdrop-blur-sm">
                    <p className="text-sm leading-6 text-[#C8E0E8]">
                        These capabilities are part of NexCare&apos;s planned
                        roadmap and are not currently available in the
                        application.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default FutureScopeSection;