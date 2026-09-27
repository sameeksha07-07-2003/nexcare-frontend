import axiosClient from "./axiosClient"

function requireAppointmentId(appointmentId) {
    if (
        appointmentId === null ||
        appointmentId === undefined ||
        String(appointmentId).trim() === ""
    ) {
        throw new Error("Appointment ID is required.")
    }
}

export async function bookAppointment({
    doctorAvailabilityId,
    appointmentDate,
    reasonForVisit = "",
}) {
    const response = await axiosClient.post(
        "/api/v1/appointments/book",
        {
            doctorAvailabilityId,
            appointmentDate,
            reasonForVisit:
                reasonForVisit.trim() || null,
        },
    )

    return response.data
}

export async function getMyAppointments({
    status,
    page = 0,
    size = 10,
    signal,
} = {}) {
    const params = {
        page: Math.max(0, Number(page) || 0),
        size: Math.max(1, Number(size) || 10),
    }

    if (status) {
        params.status = status
    }

    const response = await axiosClient.get(
        "/api/v1/appointments/me",
        {
            params,
            signal,
        },
    )

    return response.data
}

export async function cancelAppointment(
    appointmentId,
    reason = "",
) {
    requireAppointmentId(appointmentId)

    const response = await axiosClient.patch(
        `/api/v1/appointments/${appointmentId}/cancel`,
        {
            reason: reason.trim() || null,
        },
    )

    return response.data
}

export async function getDoctorAppointments({
    scope,
    status,
    page = 0,
    size = 10,
    signal,
} = {}) {
    const params = {
        page: Math.max(0, Number(page) || 0),
        size: Math.max(1, Number(size) || 10),
    }

    if (scope) {
        params.scope = scope
    } else if (status) {
        params.status = status
    }

    const response = await axiosClient.get(
        "/api/v1/appointments/doctor",
        {
            params,
            signal,
        },
    )

    return response.data
}

export async function getDoctorAppointmentSummary({
    signal,
} = {}) {
    const response = await axiosClient.get(
        "/api/v1/appointments/doctor/summary",
        {
            signal,
        },
    )

    return response.data
}

export async function completeAppointment(
    appointmentId,
) {
    requireAppointmentId(appointmentId)

    const response = await axiosClient.patch(
        `/api/v1/appointments/${appointmentId}/complete`,
    )

    return response.data
}

export async function markAppointmentNoShow(
    appointmentId,
) {
    requireAppointmentId(appointmentId)

    const response = await axiosClient.patch(
        `/api/v1/appointments/${appointmentId}/no-show`,
    )

    return response.data
}

export async function submitDoctorReview(
    appointmentId,
    {
        rating,
        comment = "",
    },
) {
    requireAppointmentId(appointmentId)

    const response = await axiosClient.post(
        `/api/v1/appointments/${appointmentId}/review`,
        {
            rating,
            comment: comment.trim() || null,
        },
    )

    return response.data
}