import { useMemo } from "react"
import { useAuth } from "../../context/AuthContext"
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    LockKeyhole,
    ShieldCheck,
    Users,
} from "lucide-react"

function formatDate(dateValue, options) {
    return new Intl.DateTimeFormat(
        "en-IN",
        options,
    ).format(
        new Date(`${dateValue}T00:00:00`),
    )
}

function formatTime(timeValue) {
    if (!timeValue) {
        return ""
    }

    const [hours, minutes] =
        timeValue.split(":").map(Number)

    const date = new Date()
    date.setHours(hours, minutes, 0, 0)

    return new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}

function groupAvailabilityByDate(availability) {
    return availability.reduce((groups, slot) => {
        const date = slot.appointmentDate

        if (!groups[date]) {
            groups[date] = []
        }

        groups[date].push(slot)

        return groups
    }, {})
}

export default function BookingPanel({
    availability,
    selectedSlot,
    reasonForVisit,
    onReasonChange,
    onSlotChange,
    onBook,
    isBooking,
    bookingError,
    bookingResult,
}) {
    const { isAuthenticated } = useAuth()
    const groupedAvailability = useMemo(
        () => groupAvailabilityByDate(availability),
        [availability],
    )

    const availableDates =
        Object.keys(groupedAvailability)

    const selectedDate =
        selectedSlot?.appointmentDate
        || availableDates[0]

    const dateSlots =
        groupedAvailability[selectedDate] ?? []

    function selectDate(date) {
        const firstBookableSlot =
            groupedAvailability[date]?.find(
                (slot) => !slot.fullyBooked,
            )

        onSlotChange(
            firstBookableSlot
            || groupedAvailability[date]?.[0]
            || null,
        )
    }

    if (bookingResult) {
        return (
            <aside
                className="
                    rounded-2xl border border-emerald-200
                    bg-white p-5
                    shadow-[0_16px_50px_rgba(16,39,63,0.08)]
                    sm:p-6
                "
            >
                <div
                    className="
                        flex h-14 w-14 items-center
                        justify-center rounded-full
                        bg-emerald-50 text-emerald-600
                    "
                >
                    <CheckCircle2
                        className="h-8 w-8"
                        aria-hidden="true"
                    />
                </div>

                <h2
                    className="
                        mt-5 font-heading text-2xl font-bold
                        text-nexcare-navy
                    "
                >
                    Appointment confirmed
                </h2>

                <p
                    className="
                        mt-2 text-sm leading-6
                        text-nexcare-textSecondary
                    "
                >
                    Your appointment with{" "}
                    {bookingResult.doctorName} has been
                    successfully booked.
                </p>

                <div
                    className="
                        mt-5 rounded-2xl
                        bg-nexcare-tealLight p-5
                        text-center
                    "
                >
                    <p
                        className="
                            text-sm font-medium
                            text-nexcare-textSecondary
                        "
                    >
                        Your queue number
                    </p>

                    <p
                        className="
                            mt-1 font-heading text-4xl
                            font-bold text-nexcare-tealDark
                        "
                    >
                        {bookingResult.queueNumber}
                    </p>
                </div>

                <dl
                    className="
                        mt-5 space-y-3 text-sm
                    "
                >
                    <div
                        className="
                            flex justify-between gap-4
                        "
                    >
                        <dt
                            className="
                                text-nexcare-textSecondary
                            "
                        >
                            Date
                        </dt>
                        <dd
                            className="
                                text-right font-semibold
                                text-nexcare-navy
                            "
                        >
                            {formatDate(
                                bookingResult.appointmentDate,
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </dd>
                    </div>

                    <div
                        className="
                            flex justify-between gap-4
                        "
                    >
                        <dt
                            className="
                                text-nexcare-textSecondary
                            "
                        >
                            Session
                        </dt>
                        <dd
                            className="
                                text-right font-semibold
                                text-nexcare-navy
                            "
                        >
                            {formatTime(
                                bookingResult.startTime,
                            )}
                            {" – "}
                            {formatTime(
                                bookingResult.endTime,
                            )}
                        </dd>
                    </div>
                </dl>
            </aside>
        )
    }

    return (
        <aside
            className="
                rounded-2xl border border-nexcare-border
                bg-white p-5
                shadow-[0_16px_50px_rgba(16,39,63,0.08)]
                sm:p-6 lg:sticky lg:top-24
            "
        >
            <div className="flex items-center gap-3">
                <div
                    className="
                        flex h-11 w-11 items-center
                        justify-center rounded-xl
                        bg-nexcare-tealLight
                        text-nexcare-teal
                    "
                >
                    <CalendarDays
                        className="h-6 w-6"
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <h2
                        className="
                            font-heading text-xl font-bold
                            text-nexcare-navy
                        "
                    >
                        Book an appointment
                    </h2>

                    <p
                        className="
                            mt-0.5 text-sm
                            text-nexcare-textSecondary
                        "
                    >
                        Select a date and session
                    </p>
                </div>
            </div>

            {availableDates.length === 0 ? (
                <div
                    className="
                        mt-6 rounded-xl border
                        border-dashed border-nexcare-border
                        bg-nexcare-surfaceSoft p-6
                        text-center
                    "
                >
                    <CalendarDays
                        className="
                            mx-auto h-7 w-7
                            text-nexcare-textSecondary
                        "
                        aria-hidden="true"
                    />

                    <p
                        className="
                            mt-3 font-semibold
                            text-nexcare-navy
                        "
                    >
                        No upcoming availability
                    </p>

                    <p
                        className="
                            mt-1 text-sm leading-6
                            text-nexcare-textSecondary
                        "
                    >
                        This doctor has not published any
                        available sessions for the next
                        three weeks.
                    </p>
                </div>
            ) : (
                <>
                    <fieldset className="mt-6">
                        <legend
                            className="
                                text-sm font-semibold
                                text-nexcare-navy
                            "
                        >
                            Select a date
                        </legend>

                        <div
                            className="
                                mt-3 flex gap-2 overflow-x-auto
                                pb-2
                            "
                        >
                            {availableDates.map((date) => {
                                const isSelected =
                                    date === selectedDate

                                return (
                                    <button
                                        type="button"
                                        key={date}
                                        onClick={() =>
                                            selectDate(date)
                                        }
                                        className={`
                                            min-w-[72px] rounded-xl
                                            border px-3 py-3 text-center
                                            transition
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-nexcare-teal
                                            ${
                                                isSelected
                                                    ? "border-nexcare-teal bg-nexcare-teal text-white shadow-[0_8px_20px_rgba(14,163,148,0.2)]"
                                                    : "border-nexcare-border bg-white text-nexcare-navy hover:border-nexcare-teal hover:bg-nexcare-tealLight"
                                            }
                                        `}
                                    >
                                        <span
                                            className="
                                                block text-xs font-medium
                                            "
                                        >
                                            {formatDate(
                                                date,
                                                {
                                                    weekday:
                                                        "short",
                                                },
                                            )}
                                        </span>

                                        <span
                                            className="
                                                mt-1 block text-lg
                                                font-bold
                                            "
                                        >
                                            {formatDate(
                                                date,
                                                {
                                                    day: "numeric",
                                                },
                                            )}
                                        </span>

                                        <span
                                            className="
                                                block text-xs
                                            "
                                        >
                                            {formatDate(
                                                date,
                                                {
                                                    month: "short",
                                                },
                                            )}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </fieldset>

                    <fieldset className="mt-5">
                        <legend
                            className="
                                text-sm font-semibold
                                text-nexcare-navy
                            "
                        >
                            Available sessions
                        </legend>

                        <div className="mt-3 space-y-3">
                            {dateSlots.map((slot) => {
                                const isSelected =
                                    selectedSlot
                                        ?.doctorAvailabilityId
                                    === slot.doctorAvailabilityId
                                    && selectedSlot
                                        ?.appointmentDate
                                    === slot.appointmentDate

                                return (
                                    <button
                                        type="button"
                                        key={`${slot.doctorAvailabilityId}-${slot.appointmentDate}`}
                                        disabled={
                                            slot.fullyBooked
                                        }
                                        onClick={() =>
                                            onSlotChange(slot)
                                        }
                                        className={`
                                            w-full rounded-xl border
                                            p-4 text-left transition
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-nexcare-teal
                                            disabled:cursor-not-allowed
                                            disabled:opacity-55
                                            ${
                                                isSelected
                                                    ? "border-nexcare-teal bg-nexcare-tealLight/60"
                                                    : "border-nexcare-border bg-white hover:border-nexcare-teal/60"
                                            }
                                        `}
                                    >
                                        <div
                                            className="
                                                flex items-start
                                                justify-between gap-3
                                            "
                                        >
                                            <div>
                                                <p
                                                    className="
                                                        flex items-center
                                                        gap-2 font-semibold
                                                        text-nexcare-navy
                                                    "
                                                >
                                                    <Clock3
                                                        className="
                                                            h-4 w-4
                                                            text-nexcare-teal
                                                        "
                                                        aria-hidden="true"
                                                    />
                                                    {formatTime(
                                                        slot.startTime,
                                                    )}
                                                    {" – "}
                                                    {formatTime(
                                                        slot.endTime,
                                                    )}
                                                </p>

                                                <p
                                                    className="
                                                        mt-2 flex
                                                        items-center gap-2
                                                        text-xs
                                                        text-nexcare-textSecondary
                                                    "
                                                >
                                                    <Users
                                                        className="h-4 w-4"
                                                        aria-hidden="true"
                                                    />
                                                    Queue-based consultation
                                                </p>
                                            </div>

                                            <span
                                                className={`
                                                    rounded-full px-2.5
                                                    py-1 text-xs
                                                    font-semibold
                                                    ${
                                                        slot.fullyBooked
                                                            ? "bg-red-50 text-red-700"
                                                            : "bg-emerald-50 text-emerald-700"
                                                    }
                                                `}
                                            >
                                                {slot.fullyBooked
                                                    ? "Fully booked"
                                                    : `${slot.remainingCapacity} spots left`}
                                            </span>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </fieldset>

                    <div className="mt-5">
                        <label
                            htmlFor="reason-for-visit"
                            className="
                                text-sm font-semibold
                                text-nexcare-navy
                            "
                        >
                            Reason for visit
                        </label>

                        <textarea
                            id="reason-for-visit"
                            value={reasonForVisit}
                            onChange={(event) =>
                                onReasonChange(
                                    event.target.value,
                                )
                            }
                            maxLength={500}
                            rows={3}
                            placeholder="Briefly describe your concern (optional)"
                            className="
                                mt-2 w-full resize-none rounded-xl
                                border border-nexcare-border
                                bg-white px-4 py-3 text-sm
                                text-nexcare-navy outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-nexcare-teal
                                focus:ring-2
                                focus:ring-nexcare-teal/15
                            "
                        />

                        <p
                            className="
                                mt-1 text-right text-xs
                                text-nexcare-textSecondary
                            "
                        >
                            {reasonForVisit.length}/500
                        </p>
                    </div>

                    {bookingError && (
                        <p
                            role="alert"
                            className="
                                mt-4 rounded-xl border
                                border-red-100 bg-red-50
                                px-4 py-3 text-sm text-red-700
                            "
                        >
                            {bookingError}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={onBook}
                        disabled={
                            !selectedSlot
                            || selectedSlot.fullyBooked
                            || isBooking
                        }
                        className="
                            mt-5 inline-flex min-h-12 w-full
                            items-center justify-center
                            rounded-xl bg-nexcare-teal
                            px-5 py-3 text-sm font-semibold
                            text-white
                            shadow-[0_10px_24px_rgba(14,163,148,0.24)]
                            transition
                            hover:bg-nexcare-tealDark
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-nexcare-teal
                            focus-visible:ring-offset-2
                        "
                    >
                        {isBooking
    ? "Booking..."
    : isAuthenticated
      ? "Confirm Appointment"
      : "Sign In to Continue"}
                    </button>

                    <p
                        className="
                            mt-3 flex items-center
                            justify-center gap-2 text-center
                            text-xs text-nexcare-textSecondary
                        "
                    >
                        <LockKeyhole
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        {isAuthenticated
    ? "Your appointment will be securely linked to your patient account."
    : "Sign in is required only to confirm your appointment."}
                    </p>

                    <div
                        className="
                            mt-5 grid grid-cols-2 gap-3
                            border-t border-nexcare-border pt-4
                            text-xs text-nexcare-textSecondary
                        "
                    >
                        <span
                            className="
                                inline-flex items-center gap-2
                            "
                        >
                            <ShieldCheck
                                className="
                                    h-4 w-4 text-emerald-600
                                "
                                aria-hidden="true"
                            />
                            Verified doctor
                        </span>

                        <span
                            className="
                                inline-flex items-center gap-2
                            "
                        >
                            <LockKeyhole
                                className="
                                    h-4 w-4 text-nexcare-teal
                                "
                                aria-hidden="true"
                            />
                            Secure booking
                        </span>
                    </div>
                </>
            )}
        </aside>
    )
}