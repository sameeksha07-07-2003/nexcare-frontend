import {
    AlertCircle,
    CalendarCheck2,
    CalendarDays,
    ChevronRight,
    XCircle,
} from "lucide-react"

const SUMMARY_ITEMS = [
    {
        scope: "TODAY",
        countKey: "today",
        title: "Today",
        description: "Appointments today",
        Icon: CalendarDays,
        containerClass:
            "border-[#D8ECEE] hover:border-[#8EDAD7]",
        iconClass: "bg-[#E4F8F6] text-[#079A99]",
        arrowClass: "text-[#079A99]",
    },
    {
        scope: "UPCOMING",
        countKey: "upcoming",
        title: "Upcoming",
        description: "Scheduled appointments",
        Icon: CalendarCheck2,
        containerClass:
            "border-[#D8EAF5] hover:border-[#9ED2F0]",
        iconClass: "bg-[#E8F5FC] text-[#168CE2]",
        arrowClass: "text-[#168CE2]",
    },
    {
        scope: "NEEDS_ACTION",
        countKey: "needsAction",
        title: "Needs Action",
        description:
            "Past appointments awaiting outcome",
        Icon: AlertCircle,
        containerClass:
            "border-[#F3E1C7] bg-[#FFFCF7] hover:border-[#F1C47C]",
        iconClass: "bg-[#FFF3DE] text-[#E67D00]",
        arrowClass: "text-[#E67D00]",
    },
    {
        scope: "CANCELLED",
        countKey: "cancelled",
        title: "Cancelled",
        description: "Cancelled appointments",
        Icon: XCircle,
        containerClass:
            "border-[#F5DDE2] bg-[#FFFDFD] hover:border-[#F2AAB8]",
        iconClass: "bg-[#FDECEF] text-[#FF334F]",
        arrowClass: "text-[#FF334F]",
    },
]

function DoctorAppointmentSummary({
    summary,
    activeScope,
    isLoading,
    onScopeChange,
}) {
    return (
        <section
            aria-label="Doctor appointment summary"
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
            {SUMMARY_ITEMS.map(
                ({
                    scope,
                    countKey,
                    title,
                    description,
                    Icon,
                    containerClass,
                    iconClass,
                    arrowClass,
                }) => {
                    const isActive =
                        activeScope === scope

                    return (
                        <button
                            key={scope}
                            type="button"
                            onClick={() =>
                                onScopeChange(scope)
                            }
                            aria-pressed={isActive}
                            className={[
                                "group flex min-h-36 items-center gap-4",
                                "rounded-2xl border bg-white p-5 text-left",
                                "shadow-[0_8px_30px_rgba(16,39,63,0.04)]",
                                "transition duration-200",
                                "hover:-translate-y-0.5",
                                "hover:shadow-[0_12px_35px_rgba(16,39,63,0.08)]",
                                "focus-visible:outline-none",
                                "focus-visible:ring-2",
                                "focus-visible:ring-[#0EA5A5]",
                                "focus-visible:ring-offset-2",
                                containerClass,
                                isActive
                                    ? "ring-1 ring-[#0EA5A5]/30"
                                    : "",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "flex h-14 w-14 shrink-0",
                                    "items-center justify-center",
                                    "rounded-full",
                                    iconClass,
                                ].join(" ")}
                            >
                                <Icon
                                    className="h-7 w-7"
                                    aria-hidden="true"
                                />
                            </span>

                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-[#173B73]">
                                    {title}
                                </span>

                                {isLoading ? (
                                    <span className="mt-2 block h-8 w-10 animate-pulse rounded bg-[#E7F1F3]" />
                                ) : (
                                    <span className="mt-1 block text-4xl font-bold leading-none text-[#071E4A]">
                                        {summary?.[
                                            countKey
                                        ] ?? 0}
                                    </span>
                                )}

                                <span className="mt-2 block text-xs leading-5 text-[#52709B]">
                                    {description}
                                </span>
                            </span>

                            <ChevronRight
                                className={[
                                    "h-5 w-5 shrink-0",
                                    "transition-transform",
                                    "group-hover:translate-x-1",
                                    arrowClass,
                                ].join(" ")}
                                aria-hidden="true"
                            />
                        </button>
                    )
                },
            )}
        </section>
    )
}

export default DoctorAppointmentSummary