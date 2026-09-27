import { useEffect } from "react"
import {
    CalendarDays,
    ClipboardList,
    Clock3,
    Hash,
    Stethoscope,
    UserRound,
    X,
} from "lucide-react"

import {
    formatAppointmentDate,
    formatAppointmentTimeRange,
    getStatusPresentation,
} from "../../utils/appointmentUi"

function DetailRow({ Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 rounded-xl bg-[#F7FBFC] p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4F8F6] text-[#079A99]">
                <Icon
                    className="h-5 w-5"
                    aria-hidden="true"
                />
            </span>

            <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#7890A9]">
                    {label}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#173B73]">
                    {value}
                </p>
            </div>
        </div>
    )
}

function AppointmentDetailsModal({
    appointment,
    onClose,
}) {
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener(
            "keydown",
            handleKeyDown,
        )

        const previousOverflow =
            document.body.style.overflow

        document.body.style.overflow = "hidden"

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown,
            )

            document.body.style.overflow =
                previousOverflow
        }
    }, [onClose])

    const statusPresentation =
        getStatusPresentation(appointment.status)

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-[#071E4A]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="appointment-details-title"
                className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-2xl sm:rounded-3xl"
            >
                <header className="flex items-start justify-between border-b border-[#DCEDEF] px-5 py-5 sm:px-7">
                    <div>
                        <p className="text-sm font-semibold text-[#0EA5A5]">
                            Appointment #
                            {appointment.appointmentId}
                        </p>

                        <h2
                            id="appointment-details-title"
                            className="mt-1 text-2xl font-bold text-[#071E4A]"
                        >
                            Appointment Details
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-[#54708A] transition hover:bg-[#EEF8F8] hover:text-[#071E4A]"
                        aria-label="Close appointment details"
                    >
                        <X
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className="p-5 sm:p-7">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#DCEDEF] bg-white p-5">
                        <div>
                            <p className="text-sm text-[#7890A9]">
                                Doctor
                            </p>

                            <h3 className="mt-1 text-xl font-bold text-[#071E4A]">
                                Dr.{" "}
                                {appointment.doctorName}
                            </h3>

                            <p className="mt-1 text-sm text-[#486DA2]">
                                {appointment.specialization ||
                                    "Medical professional"}
                            </p>
                        </div>

                        <span
                            className={[
                                "inline-flex items-center gap-2 rounded-full",
                                "px-4 py-2 text-xs font-bold",
                                statusPresentation.badgeClass,
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "h-2.5 w-2.5 rounded-full",
                                    statusPresentation.dotClass,
                                ].join(" ")}
                            />

                            {statusPresentation.label}
                        </span>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <DetailRow
                            Icon={CalendarDays}
                            label="Appointment date"
                            value={formatAppointmentDate(
                                appointment.appointmentDate,
                            )}
                        />

                        <DetailRow
                            Icon={Clock3}
                            label="Session time"
                            value={formatAppointmentTimeRange(
                                appointment.startTime,
                                appointment.endTime,
                            )}
                        />

                        <DetailRow
                            Icon={Hash}
                            label="Queue number"
                            value={
                                appointment.queueNumber ??
                                "Not assigned"
                            }
                        />

                        <DetailRow
                            Icon={Stethoscope}
                            label="Specialization"
                            value={
                                appointment.specialization ||
                                "Not available"
                            }
                        />

                        <DetailRow
                            Icon={UserRound}
                            label="Patient"
                            value={
                                appointment.patientName ||
                                "Not available"
                            }
                        />

                        <DetailRow
                            Icon={ClipboardList}
                            label="Reason for visit"
                            value={
                                appointment.reasonForVisit ||
                                "Not provided"
                            }
                        />
                    </div>

                    {appointment.cancellationReason && (
                        <div className="mt-4 rounded-xl border border-[#F7CCD4] bg-[#FFF6F7] p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#C52C45]">
                                Cancellation reason
                            </p>

                            <p className="mt-2 text-sm text-[#7D3040]">
                                {
                                    appointment.cancellationReason
                                }
                            </p>
                        </div>
                    )}
                </div>

                <footer className="border-t border-[#DCEDEF] px-5 py-4 sm:px-7">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-xl bg-[#0EA5A5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B8F90]"
                    >
                        Close
                    </button>
                </footer>
            </section>
        </div>
    )
}

export default AppointmentDetailsModal