import {
    ClipboardList,
    Clock3,
    Eye,
    RotateCcw,
    Star,
    Trash2,
    Users,
} from "lucide-react"

import {
    formatAppointmentTimeRange,
    getAppointmentDateParts,
    getAppointmentInitials,
    getStatusPresentation,
} from "../../utils/appointmentUi"

function AppointmentCard({
    appointment,
    onViewDetails,
    onCancel,
    onReview,
    onBookAgain,
}) {
    const {
        appointmentId,
        appointmentDate,
        doctorId,
        doctorName,
        doctorProfileImageUrl,
        endTime,
        queueNumber,
        reasonForVisit,
        reviewSubmitted,
        specialization,
        startTime,
        status,
    } = appointment

    const dateParts =
        getAppointmentDateParts(appointmentDate)

    const statusPresentation =
        getStatusPresentation(status)

    const isUpcoming = status === "BOOKED"
    const isCompleted = status === "COMPLETED"
    const isCancelled = status === "CANCELLED"

    return (
        <article className="rounded-2xl border border-[#D8ECEE] bg-white p-4 shadow-[0_8px_30px_rgba(16,39,63,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(16,39,63,0.08)] sm:p-5">
            <div className="grid gap-5 xl:grid-cols-[118px_minmax(260px,1fr)_minmax(310px,1.15fr)_235px] xl:items-center">
                <div className="flex min-h-32 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#E6FAF8] to-[#EFFBFA] px-3 py-4 text-center">
                    <span className="text-sm font-semibold text-[#079A99]">
                        {dateParts.weekday}
                    </span>

                    <span className="mt-1 text-5xl font-bold leading-none text-[#079A99]">
                        {dateParts.day}
                    </span>

                    <span className="mt-2 text-sm font-semibold text-[#079A99]">
                        {dateParts.monthYear}
                    </span>
                </div>

                <div className="flex min-w-0 items-center gap-4">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDF5F3] text-xl font-bold text-[#087F80]">
                        <span aria-hidden="true">
                            {getAppointmentInitials(
                                doctorName,
                            )}
                        </span>

                        {doctorProfileImageUrl && (
                            <img
                                src={doctorProfileImageUrl}
                                alt={`Dr. ${doctorName}`}
                                className="absolute inset-0 h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display =
                                        "none"
                                }}
                            />
                        )}
                    </div>

                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="truncate text-xl font-bold text-[#071E4A]">
                                Dr. {doctorName}
                            </h2>

                            <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0EA5A5] text-xs font-bold text-white"
                                title="Verified doctor"
                                aria-label="Verified doctor"
                            >
                                ✓
                            </span>
                        </div>

                        <p className="mt-1 text-sm font-medium text-[#486DA2]">
                            {specialization ||
                                "Medical professional"}
                        </p>

                        <p className="mt-3 text-xs text-[#7890A9]">
                            Appointment #{appointmentId}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 border-[#DCEDEF] xl:border-l xl:pl-8">
                    <div className="flex items-center gap-3 text-sm text-[#486DA2]">
                        <Clock3
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                        />

                        <span className="font-medium">
                            {formatAppointmentTimeRange(
                                startTime,
                                endTime,
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[#486DA2]">
                        <Users
                            className="h-5 w-5 shrink-0"
                            aria-hidden="true"
                        />

                        <span>
                            Queue No.{" "}
                            {queueNumber ?? "Not assigned"}
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-[#486DA2]">
                        <ClipboardList
                            className="mt-0.5 h-5 w-5 shrink-0"
                            aria-hidden="true"
                        />

                        <span>
                            Reason:{" "}
                            {reasonForVisit ||
                                "Not provided"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span
                        className={[
                            "mb-1 inline-flex w-fit items-center gap-2",
                            "self-start rounded-full px-4 py-2",
                            "text-xs font-bold xl:self-center",
                            statusPresentation.badgeClass,
                        ].join(" ")}
                    >
                        <span
                            className={[
                                "h-2.5 w-2.5 rounded-full",
                                statusPresentation.dotClass,
                            ].join(" ")}
                            aria-hidden="true"
                        />

                        {statusPresentation.label}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onViewDetails(appointment)
                        }
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#08A3A3] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#078B8C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A5] focus-visible:ring-offset-2"
                    >
                        <Eye
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        View Details
                    </button>

                    {isUpcoming && (
                        <button
                            type="button"
                            onClick={() =>
                                onCancel(appointment)
                            }
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#FF3B55] bg-white px-5 py-3 text-sm font-semibold text-[#EA2945] transition hover:bg-[#FFF4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B55] focus-visible:ring-offset-2"
                        >
                            <Trash2
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Cancel Appointment
                        </button>
                    )}

                    {isCompleted &&
                        !reviewSubmitted && (
                            <button
                                type="button"
                                onClick={() =>
                                    onReview(
                                        appointment,
                                    )
                                }
                                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#F2B01E] bg-[#FFFDF5] px-5 py-3 text-sm font-semibold text-[#9A6500] transition hover:bg-[#FFF8DD]"
                            >
                                <Star
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                                Write a Review
                            </button>
                        )}

                    {isCompleted &&
                        reviewSubmitted && (
                            <p className="text-center text-xs font-semibold text-[#17803D]">
                                Review submitted
                            </p>
                        )}

                    {isCancelled && (
                        <button
                            type="button"
                            onClick={() =>
                                onBookAgain(doctorId)
                            }
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#0EA5A5] bg-white px-5 py-3 text-sm font-semibold text-[#087F80] transition hover:bg-[#ECFBFA]"
                        >
                            <RotateCcw
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Book Again
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export default AppointmentCard