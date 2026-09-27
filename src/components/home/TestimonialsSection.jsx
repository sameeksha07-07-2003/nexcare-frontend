import { Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        id: 'priya-feedback',
        quote:
            'Finding a suitable doctor feels clear and stress-free with NexCare.',
        name: 'Priya S.',
        context: 'Doctor discovery',
        initials: 'PS',
        avatarClasses: 'bg-[#DDF8F7] text-[#087E80]',
    },
    {
        id: 'rahul-feedback',
        quote:
            'The symptom checker helped me understand what I should do next.',
        name: 'Rahul M.',
        context: 'Symptom guidance',
        initials: 'RM',
        avatarClasses: 'bg-[#E5F0FF] text-[#315F96]',
    },
    {
        id: 'anjali-feedback',
        quote:
            'Managing my reports in one place feels much easier and more organized.',
        name: 'Anjali K.',
        context: 'Medical records',
        initials: 'AK',
        avatarClasses: 'bg-[#F0EAFE] text-[#674EA0]',
    },
];

function TestimonialsSection() {
    return (
        <section
            aria-labelledby="testimonials-heading"
            className="bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-12 2xl:px-16">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5A5] sm:text-sm">
                        Early user feedback
                    </p>

                    <h2
                        id="testimonials-heading"
                        className="mt-3 text-3xl font-extrabold tracking-tight text-[#0B2D5C] sm:text-4xl lg:text-5xl"
                    >
                        Care that feels simple and supportive.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#52789E] sm:text-lg">
                        Thoughtful healthcare experiences begin with clarity,
                        trust, and tools that are easy to use.
                    </p>
                </div>

                {/* Testimonial cards */}
                <div className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-6">
                    {TESTIMONIALS.map((testimonial) => (
                        <article
                            key={testimonial.id}
                            className="group relative flex h-full flex-col rounded-3xl border border-[#DCEFF1] bg-[#FAFEFF] p-6 shadow-[0_12px_35px_rgba(11,45,92,0.06)] transition duration-300 hover:border-[#A8DFE1] hover:shadow-[0_18px_45px_rgba(11,45,92,0.10)] motion-safe:hover:-translate-y-1 sm:p-7"
                        >
                            {/* Quote icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4FAF8] text-[#0EA5A5]">
                                <Quote
                                    size={24}
                                    fill="currentColor"
                                    strokeWidth={1.6}
                                    aria-hidden="true"
                                />
                            </div>

                            <blockquote className="mt-6 flex-1">
                                <p className="text-lg font-medium leading-8 text-[#183C66]">
                                    “{testimonial.quote}”
                                </p>
                            </blockquote>

                            {/* User identity */}
                            <div className="mt-7 flex items-center gap-3 border-t border-[#E1EFF1] pt-5">
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${testimonial.avatarClasses}`}
                                    aria-hidden="true"
                                >
                                    {testimonial.initials}
                                </div>

                                <div>
                                    <p className="font-semibold text-[#0B2D5C]">
                                        {testimonial.name}
                                    </p>

                                    <p className="mt-0.5 text-sm text-[#6484A1]">
                                        {testimonial.context}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;