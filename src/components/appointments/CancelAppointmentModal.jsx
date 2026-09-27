import { useEffect, useState } from "react"
import { AlertTriangle, LoaderCircle, X } from "lucide-react"

function CancelAppointmentModal({
    appointment,
    isSubmitting,
    errorMessage,
    onConfirm,
    onClose,
}) {
    const [reason, setReason] = useState("")

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

    function handleSubmit(event) {
        event.preventDefault()
        onConfirm(reason)
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#071E4A]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <section
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="cancel-appointment-title"
                className="w-full rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            >
                <form onSubmit={handleSubmit}>
                    <header className="flex items-start justify-between px-5 pb-3 pt-6 sm:px-7">
                        <div className="flex gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FDECEF] text-[#EA2945]">
                                <AlertTriangle
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </span>

                            <div>
                                <h2
                                    id="cancel-appointment-title"
                                    className="text-xl font-bold text-[#071E4A]"
                                >
                                    Cancel Appointment?
                                </h2>

                                <p className="mt-1 text-sm text-[#54708A]">
                                    Your appointment with Dr.{" "}
                                    {appointment.doctorName}{" "}
                                    will be cancelled.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#54708A] hover:bg-[#F3F7F8] disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Close cancellation confirmation"
                        >
                            <X
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </header>

                    <div className="px-5 py-4 sm:px-7">
                        <label
                            htmlFor="cancellation-reason"
                            className="text-sm font-semibold text-[#173B73]"
                        >
                            Reason for cancellation{" "}
                            <span className="font-normal text-[#7890A9]">
                                (optional)
                            </span>
                        </label>

                        <textarea
                            id="cancellation-reason"
                            value={reason}
                            onChange={(event) =>
                                setReason(
                                    event.target.value.slice(
                                        0,
                                        300,
                                    ),
                                )
                            }
                            rows={4}
                            placeholder="Tell us why you are cancelling..."
                            className="mt-2 w-full resize-none rounded-xl border border-[#CDDFE4] px-4 py-3 text-sm text-[#173B73] outline-none transition placeholder:text-[#91A3B6] focus:border-[#0EA5A5] focus:ring-2 focus:ring-[#0EA5A5]/15"
                        />

                        <p className="mt-1 text-right text-xs text-[#7890A9]">
                            {reason.length}/300
                        </p>

                        {errorMessage && (
                            <p
                                role="alert"
                                className="mt-3 rounded-xl bg-[#FFF1F3] px-4 py-3 text-sm text-[#C52C45]"
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
                            className="rounded-xl border border-[#CFE0E5] px-4 py-3 text-sm font-semibold text-[#385574] transition hover:bg-[#F5FAFA] disabled:opacity-50"
                        >
                            Keep Appointment
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA2945] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#D51F3A] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting && (
                                <LoaderCircle
                                    className="h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}

                            {isSubmitting
                                ? "Cancelling..."
                                : "Cancel Appointment"}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    )
}

export default CancelAppointmentModal