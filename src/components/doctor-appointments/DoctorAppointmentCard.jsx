import {
    CheckCircle2,
    ClipboardList,
    Clock3,
    Eye,
    UserX,
    Users,
} from "lucide-react"

import {
    formatAppointmentTimeRange,
    getAppointmentDateParts,
    getAppointmentInitials,
    getStatusPresentation,
} from "../../utils/appointmentUi"

function DoctorAppointmentCard({
    appointment,
    activeScope,
    onViewDetails,
    onComplete,
    onNoShow,
}) {
    const dateParts =
        getAppointmentDateParts(
            appointment.appointmentDate,
        )

    const statusPresentation =
        getStatusPresentation(appointment.status)

    const needsAction =
        activeScope === "NEEDS_ACTION" &&
        appointment.status === "BOOKED"

    

    return (
        <article className="rounded-2xl border border-[#D8ECEE] bg-white p-4 shadow-[0_8px_30px_rgba(16,39,63,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_38px_rgba(16,39,63,0.08)] sm:p-5">
            <div className="grid gap-5 xl:grid-cols-[118px_minmax(240px,1fr)_minmax(290px,1.1fr)_300px] xl:items-center">
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
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#DDF5F3] to-[#DCEEFF] text-2xl font-bold text-[#17609B]">
                        {getAppointmentInitials(
                            appointment.patientName,
                        )}
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-xl font-bold text-[#071E4A]">
                            {appointment.patientName}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-[#486DA2]">
                            Patient ID #
                            {appointment.patientId}
                        </p>

                        <p className="mt-3 text-xs text-[#7890A9]">
                            Appointment #
                            {appointment.appointmentId}
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
                                appointment.startTime,
                                appointment.endTime,
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
                            {appointment.queueNumber ??
                                "Not assigned"}
                        </span>
                    </div>

                    <div className="flex items-start gap-3 text-sm text-[#486DA2]">
                        <ClipboardList
                            className="mt-0.5 h-5 w-5 shrink-0"
                            aria-hidden="true"
                        />

                        <span>
                            Reason:{" "}
                            {appointment.reasonForVisit ||
                                "Not provided"}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span
                        className={[
                            "mb-1 inline-flex w-fit items-center gap-2",
                            "self-start rounded-full px-4 py-2",
                            "text-xs font-bold xl:self-end",
                            needsAction
                                ? "bg-[#FFF1D9] text-[#BD6500]"
                                : statusPresentation.badgeClass,
                        ].join(" ")}
                    >
                        <span
                            className={[
                                "h-2.5 w-2.5 rounded-full",
                                needsAction
                                    ? "bg-[#E67D00]"
                                    : statusPresentation.dotClass,
                            ].join(" ")}
                            aria-hidden="true"
                        />

                        {needsAction
                            ? "ACTION REQUIRED"
                            : statusPresentation.label}
                    </span>

                    <button
                        type="button"
                        onClick={() =>
                            onViewDetails(appointment)
                        }
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#0EA5A5] bg-white px-4 py-3 text-sm font-semibold text-[#087F80] transition hover:bg-[#ECFBFA]"
                    >
                        <Eye
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        View Details
                    </button>

                    {needsAction && (
                        <button
                            type="button"
                            onClick={() =>
                                onComplete(appointment)
                            }
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0EA5A5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B8F90]"
                        >
                            <CheckCircle2
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Mark Completed
                        </button>
                    )}

                    {needsAction && (
                        <button
                            type="button"
                            onClick={() =>
                                onNoShow(appointment)
                            }
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#E67D00] bg-white px-4 py-3 text-sm font-semibold text-[#C86C00] transition hover:bg-[#FFF8EB]"
                        >
                            <UserX
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            No Show
                        </button>
                    )}
                </div>
            </div>
        </article>
    )
}

export default DoctorAppointmentCard