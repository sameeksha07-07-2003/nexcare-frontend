import { useEffect } from "react"
import {
    AlertTriangle,
    CheckCircle2,
    LoaderCircle,
    UserX,
    X,
} from "lucide-react"

function AppointmentOutcomeModal({
    appointment,
    action,
    isSubmitting,
    errorMessage,
    onConfirm,
    onClose,
}) {
    const isComplete = action === "COMPLETE"

    useEffect(() => {
        function handleKeyDown(event) {
            if (
                event.key === "Escape" &&
                !isSubmitting
            ) {
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
    }, [isSubmitting, onClose])

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#071E4A]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <section
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="outcome-title"
                className="w-full rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            >
                <header className="flex items-start justify-between px-5 pb-3 pt-6 sm:px-7">
                    <div className="flex gap-4">
                        <span
                            className={[
                                "flex h-12 w-12 shrink-0",
                                "items-center justify-center",
                                "rounded-full",
                                isComplete
                                    ? "bg-[#E7F8EF] text-[#18834A]"
                                    : "bg-[#FFF3DE] text-[#D97706]",
                            ].join(" ")}
                        >
                            {isComplete ? (
                                <CheckCircle2
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            ) : (
                                <UserX
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            )}
                        </span>

                        <div>
                            <h2
                                id="outcome-title"
                                className="text-xl font-bold text-[#071E4A]"
                            >
                                {isComplete
                                    ? "Complete Appointment?"
                                    : "Mark Patient as No-Show?"}
                            </h2>

                            <p className="mt-1 text-sm text-[#54708A]">
                                {isComplete
                                    ? `Confirm that the consultation with ${appointment.patientName} was completed.`
                                    : `Confirm that ${appointment.patientName} did not attend this appointment.`}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#54708A] hover:bg-[#F3F7F8] disabled:opacity-50"
                        aria-label="Close confirmation"
                    >
                        <X
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <div className="px-5 py-4 sm:px-7">
                    <div className="rounded-xl border border-[#DCEDEF] bg-[#F7FBFC] p-4">
                        <p className="font-semibold text-[#173B73]">
                            {appointment.patientName}
                        </p>

                        <p className="mt-1 text-sm text-[#54708A]">
                            Appointment #
                            {appointment.appointmentId} ·
                            Queue No.{" "}
                            {appointment.queueNumber}
                        </p>
                    </div>

                    {!isComplete && (
                        <div className="mt-4 flex gap-3 rounded-xl bg-[#FFF8EB] p-4 text-sm text-[#9A5A00]">
                            <AlertTriangle
                                className="h-5 w-5 shrink-0"
                                aria-hidden="true"
                            />

                            This action records a missed
                            appointment in the patient’s
                            appointment history.
                        </div>
                    )}

                    {errorMessage && (
                        <p
                            role="alert"
                            className="mt-4 rounded-xl bg-[#FFF1F3] px-4 py-3 text-sm text-[#C52C45]"
                        >
                            {errorMessage}
                        </p>
                    )}
                </div>

                <footer className="grid grid-cols-2 gap-3 border-t border-[#DCEDEF] px-5 py-4 sm:px-7">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-xl border border-[#CFE0E5] px-4 py-3 text-sm font-semibold text-[#385574] disabled:opacity-50"
                    >
                        Go Back
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className={[
                            "inline-flex items-center justify-center gap-2",
                            "rounded-xl px-4 py-3",
                            "text-sm font-semibold text-white",
                            "disabled:cursor-not-allowed disabled:opacity-60",
                            isComplete
                                ? "bg-[#0EA5A5] hover:bg-[#0B8F90]"
                                : "bg-[#D97706] hover:bg-[#B96205]",
                        ].join(" ")}
                    >
                        {isSubmitting && (
                            <LoaderCircle
                                className="h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}

                        {isSubmitting
                            ? "Updating..."
                            : isComplete
                              ? "Mark Completed"
                              : "Confirm No-Show"}
                    </button>
                </footer>
            </section>
        </div>
    )
}

export default AppointmentOutcomeModal