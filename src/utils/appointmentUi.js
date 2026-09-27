export const APPOINTMENT_FILTERS = [
    {
        key: "upcoming",
        apiStatus: "BOOKED",
        label: "Upcoming",
    },
    {
        key: "completed",
        apiStatus: "COMPLETED",
        label: "Completed",
    },
    {
        key: "cancelled",
        apiStatus: "CANCELLED",
        label: "Cancelled",
    },
]

export function getAppointmentFilter(filterKey) {
    return (
        APPOINTMENT_FILTERS.find(
            (filter) => filter.key === filterKey,
        ) ?? APPOINTMENT_FILTERS[0]
    )
}

export function getAppointmentInitials(name = "") {
    const initials = name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")

    return initials || "DR"
}

export function formatAppointmentTime(time) {
    if (!time) {
        return "Time unavailable"
    }

    const [hourValue = "0", minute = "00"] =
        time.split(":")

    const hour = Number(hourValue)

    if (Number.isNaN(hour)) {
        return time
    }

    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12

    return `${String(displayHour).padStart(
        2,
        "0",
    )}:${minute} ${period}`
}

export function formatAppointmentTimeRange(
    startTime,
    endTime,
) {
    return `${formatAppointmentTime(
        startTime,
    )} – ${formatAppointmentTime(endTime)}`
}

export function getAppointmentDateParts(dateValue) {
    if (!dateValue) {
        return {
            weekday: "",
            day: "--",
            monthYear: "Date unavailable",
        }
    }

    const date = new Date(`${dateValue}T00:00:00`)

    if (Number.isNaN(date.getTime())) {
        return {
            weekday: "",
            day: "--",
            monthYear: dateValue,
        }
    }

    return {
        weekday: new Intl.DateTimeFormat("en-US", {
            weekday: "short",
        })
            .format(date)
            .toUpperCase(),

        day: new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
        }).format(date),

        monthYear: new Intl.DateTimeFormat("en-US", {
            month: "short",
            year: "numeric",
        })
            .format(date)
            .toUpperCase(),
    }
}

export function formatAppointmentDate(dateValue) {
    if (!dateValue) {
        return "Date unavailable"
    }

    const date = new Date(`${dateValue}T00:00:00`)

    if (Number.isNaN(date.getTime())) {
        return dateValue
    }

    return new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(date)
}

export function getStatusPresentation(status) {
    const presentations = {
        BOOKED: {
            label: "CONFIRMED",
            badgeClass:
                "bg-[#E8F8EF] text-[#17803D]",
            dotClass: "bg-[#35B91A]",
        },
        COMPLETED: {
            label: "COMPLETED",
            badgeClass:
                "bg-[#E9F4FC] text-[#1675B8]",
            dotClass: "bg-[#168CE2]",
        },
        CANCELLED: {
            label: "CANCELLED",
            badgeClass:
                "bg-[#FDECEF] text-[#D92D47]",
            dotClass: "bg-[#EF334E]",
        },
        NO_SHOW: {
            label: "NO SHOW",
            badgeClass:
                "bg-[#FFF5E8] text-[#A75A00]",
            dotClass: "bg-[#F5A623]",
        },
    }

    return (
        presentations[status] ?? {
            label: status || "UNKNOWN",
            badgeClass:
                "bg-[#EEF3F7] text-[#48627C]",
            dotClass: "bg-[#71869B]",
        }
    )
}

export function getAppointmentTimestamp(appointment) {
    if (
        !appointment?.appointmentDate ||
        !appointment?.startTime
    ) {
        return 0
    }

    const timestamp = new Date(
        `${appointment.appointmentDate}T${appointment.startTime}`,
    ).getTime()

    return Number.isNaN(timestamp) ? 0 : timestamp
}

export function getApiErrorMessage(
    error,
    fallbackMessage,
) {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        fallbackMessage
    )
}