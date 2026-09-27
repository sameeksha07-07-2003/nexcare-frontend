import { useEffect, useState } from "react"
import {
    LoaderCircle,
    Star,
    X,
} from "lucide-react"

function ReviewModal({
    appointment,
    isSubmitting,
    errorMessage,
    onSubmit,
    onClose,
}) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

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

        if (rating === 0) {
            return
        }

        onSubmit({
            rating,
            comment,
        })
    }

    return (
        <div className="fixed inset-0 z-[110] flex items-end justify-center bg-[#071E4A]/45 p-0 backdrop-blur-sm sm:items-center sm:p-5">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="review-title"
                className="w-full rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            >
                <form onSubmit={handleSubmit}>
                    <header className="flex items-start justify-between border-b border-[#DCEDEF] px-5 py-5 sm:px-7">
                        <div>
                            <h2
                                id="review-title"
                                className="text-xl font-bold text-[#071E4A]"
                            >
                                Review Your Appointment
                            </h2>

                            <p className="mt-1 text-sm text-[#54708A]">
                                Share your experience with Dr.{" "}
                                {appointment.doctorName}.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#54708A] transition hover:bg-[#F3F7F8] disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Close review form"
                        >
                            <X
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    </header>

                    <div className="space-y-5 px-5 py-5 sm:px-7">
                        <fieldset>
                            <legend className="text-sm font-semibold text-[#173B73]">
                                Your rating
                            </legend>

                            <div className="mt-3 flex gap-2">
                                {[1, 2, 3, 4, 5].map(
                                    (value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() =>
                                                setRating(
                                                    value,
                                                )
                                            }
                                            className="rounded-lg p-1 transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A5]"
                                            aria-label={`${value} star${value > 1 ? "s" : ""}`}
                                            aria-pressed={
                                                rating ===
                                                value
                                            }
                                        >
                                            <Star
                                                className={[
                                                    "h-8 w-8 transition-colors",
                                                    value <=
                                                    rating
                                                        ? "fill-[#F5B301] text-[#F5B301]"
                                                        : "text-[#CAD7DF]",
                                                ].join(
                                                    " ",
                                                )}
                                                aria-hidden="true"
                                            />
                                        </button>
                                    ),
                                )}
                            </div>

                            {rating === 0 && (
                                <p className="mt-2 text-xs text-[#7890A9]">
                                    Select a rating to
                                    continue.
                                </p>
                            )}
                        </fieldset>

                        <div>
                            <label
                                htmlFor="review-comment"
                                className="text-sm font-semibold text-[#173B73]"
                            >
                                Comment{" "}
                                <span className="font-normal text-[#7890A9]">
                                    (optional)
                                </span>
                            </label>

                            <textarea
                                id="review-comment"
                                value={comment}
                                onChange={(event) =>
                                    setComment(
                                        event.target.value.slice(
                                            0,
                                            500,
                                        ),
                                    )
                                }
                                rows={4}
                                placeholder="Describe your experience..."
                                className="mt-2 w-full resize-none rounded-xl border border-[#CDDFE4] px-4 py-3 text-sm text-[#173B73] outline-none transition placeholder:text-[#91A3B6] focus:border-[#0EA5A5] focus:ring-2 focus:ring-[#0EA5A5]/15"
                            />

                            <p className="mt-1 text-right text-xs text-[#7890A9]">
                                {comment.length}/500
                            </p>
                        </div>

                        {errorMessage && (
                            <p
                                role="alert"
                                className="rounded-xl bg-[#FFF1F3] px-4 py-3 text-sm text-[#C52C45]"
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
                            Not Now
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isSubmitting ||
                                rating === 0
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0EA5A5] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B8F90] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting && (
                                <LoaderCircle
                                    className="h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}

                            {isSubmitting
                                ? "Submitting..."
                                : "Submit Review"}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    )
}

export default ReviewModal