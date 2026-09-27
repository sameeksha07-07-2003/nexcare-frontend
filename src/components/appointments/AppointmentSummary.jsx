import {
    CalendarCheck2,
    Check,
    ChevronRight,
    X,
} from "lucide-react"

const SUMMARY_ITEMS = [
    {
        status: "BOOKED",
        title: "Upcoming Appointments",
        description: "Scheduled appointments",
        Icon: CalendarCheck2,
        containerClass:
            "border-[#D8ECEE] bg-white hover:border-[#8EDAD7]",
        iconContainerClass: "bg-[#E4F8F6] text-[#079A99]",
        arrowClass: "text-[#079A99]",
    },
    {
        status: "COMPLETED",
        title: "Completed Appointments",
        description: "Past appointments",
        Icon: Check,
        containerClass:
            "border-[#D8EAF5] bg-white hover:border-[#9ED2F0]",
        iconContainerClass: "bg-[#E8F5FC] text-[#168CE2]",
        arrowClass: "text-[#168CE2]",
    },
    {
        status: "CANCELLED",
        title: "Cancelled Appointments",
        description: "Cancelled by you or doctor",
        Icon: X,
        containerClass:
            "border-[#F5DDE2] bg-[#FFFDFD] hover:border-[#F2AAB8]",
        iconContainerClass: "bg-[#FDECEF] text-[#FF334F]",
        arrowClass: "text-[#FF334F]",
    },
]

function AppointmentSummary({
    counts = {},
    activeStatus = "BOOKED",
    onStatusChange,
    isLoading = false,
}) {
    return (
        <section
            aria-label="Appointment summary"
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
            {SUMMARY_ITEMS.map(
                ({
                    status,
                    title,
                    description,
                    Icon,
                    containerClass,
                    iconContainerClass,
                    arrowClass,
                }) => {
                    const isActive = activeStatus === status
                    const count = counts[status] ?? 0

                    return (
                        <button
                            key={status}
                            type="button"
                            onClick={() => onStatusChange?.(status)}
                            aria-pressed={isActive}
                            className={[
                                "group flex min-h-36 w-full items-center gap-5",
                                "rounded-2xl border p-5 text-left",
                                "shadow-[0_8px_30px_rgba(16,39,63,0.04)]",
                                "transition duration-200",
                                "hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(16,39,63,0.08)]",
                                "focus-visible:outline-none focus-visible:ring-2",
                                "focus-visible:ring-[#0EA5A5] focus-visible:ring-offset-2",
                                containerClass,
                                isActive
                                    ? "ring-1 ring-[#0EA5A5]/30"
                                    : "",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "flex h-16 w-16 shrink-0 items-center",
                                    "justify-center rounded-full",
                                    iconContainerClass,
                                ].join(" ")}
                            >
                                <Icon
                                    className="h-8 w-8"
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </span>

                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-[#173B73] sm:text-base">
                                    {title}
                                </span>

                                {isLoading ? (
                                    <span
                                        className="mt-2 block h-9 w-12 animate-pulse rounded-lg bg-[#E7F1F3]"
                                        aria-label={`Loading ${title.toLowerCase()} count`}
                                    />
                                ) : (
                                    <span className="mt-1 block text-4xl font-bold leading-none text-[#071E4A]">
                                        {count}
                                    </span>
                                )}

                                <span className="mt-2 block text-sm text-[#52709B]">
                                    {description}
                                </span>
                            </span>

                            <ChevronRight
                                className={[
                                    "h-6 w-6 shrink-0 transition-transform",
                                    "duration-200 group-hover:translate-x-1",
                                    arrowClass,
                                ].join(" ")}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </button>
                    )
                },
            )}
        </section>
    )
}

export default AppointmentSummary