import axiosClient from "./axiosClient"

export const DOCTORS_PAGE_SIZE = 6

function requireDoctorId(doctorId) {
    if (
        doctorId === null ||
        doctorId === undefined ||
        String(doctorId).trim() === ""
    ) {
        throw new Error("Doctor ID is required.")
    }
}

function normalizeText(value) {
    if (typeof value !== "string") {
        return ""
    }

    return value.trim()
}

/**
 * Fetches approved doctors from the public Doctor Discovery API.
 *
 * Supported backend filters:
 * - search
 * - city
 * - specialization
 * - qualification
 * - minExperience
 * - sort
 * - page
 * - size
 */
export async function getDoctors({
    search = "",
    city = "",
    specialization = "",
    qualification = "",
    minExperience = "",
    sort = "rating",
    page = 0,
    size = DOCTORS_PAGE_SIZE,
    signal,
} = {}) {
    const params = {
        page: Math.max(0, Number(page) || 0),

        size: Math.max(
            1,
            Number(size) || DOCTORS_PAGE_SIZE,
        ),

        sort: normalizeText(sort) || "rating",
    }

    const trimmedSearch = normalizeText(search)
    const trimmedCity = normalizeText(city)

    const trimmedSpecialization =
        normalizeText(specialization)

    const trimmedQualification =
        normalizeText(qualification)

    if (trimmedSearch) {
        params.search = trimmedSearch
    }

    if (trimmedCity) {
        params.city = trimmedCity
    }

    if (trimmedSpecialization) {
        params.specialization =
            trimmedSpecialization
    }

    if (trimmedQualification) {
        params.qualification =
            trimmedQualification
    }

    if (
        minExperience !== "" &&
        minExperience !== null &&
        minExperience !== undefined
    ) {
        params.minExperience = Math.max(
            0,
            Number(minExperience) || 0,
        )
    }

    const response = await axiosClient.get(
        "/api/v1/doctors",
        {
            params,
            signal,
        },
    )

    return response.data
}

/**
 * Returns the real filter values available for approved doctors.
 */
export async function getDoctorFilterOptions({
    signal,
} = {}) {
    const response = await axiosClient.get(
        "/api/v1/doctors/filter-options",
        {
            signal,
        },
    )

    return response.data
}

/**
 * Returns the complete public profile of one approved doctor.
 */
export async function getDoctorDetails(
    doctorId,
    { signal } = {},
) {
    requireDoctorId(doctorId)

    const response = await axiosClient.get(
        `/api/v1/doctors/${doctorId}`,
        {
            signal,
        },
    )

    return response.data
}

/**
 * Returns concrete bookable dates and session windows.
 */
export async function getDoctorAvailability(
    doctorId,
    {
        startDate,
        days = 21,
        signal,
    } = {},
) {
    requireDoctorId(doctorId)

    const params = {
        days: Math.min(
            21,
            Math.max(1, Number(days) || 21),
        ),
    }

    if (normalizeText(startDate)) {
        params.startDate =
            normalizeText(startDate)
    }

    const response = await axiosClient.get(
        `/api/v1/doctors/${doctorId}/availability`,
        {
            params,
            signal,
        },
    )

    return response.data
}

/**
 * Returns paginated verified reviews for an approved doctor.
 */
export async function getDoctorReviews(
    doctorId,
    {
        page = 0,
        size = 10,
        signal,
    } = {},
) {
    requireDoctorId(doctorId)

    const response = await axiosClient.get(
        `/api/v1/doctors/${doctorId}/reviews`,
        {
            params: {
                page: Math.max(
                    0,
                    Number(page) || 0,
                ),

                size: Math.max(
                    1,
                    Number(size) || 10,
                ),
            },
            signal,
        },
    )

    return response.data
}

export async function getMyDoctorProfile({ signal } = {}) {
    const response = await axiosClient.get(
        "/doctor/profile",
        { signal },
    )

    return response.data
}

export async function updateMyDoctorProfile(profileData) {
    const response = await axiosClient.put(
        "/doctor/profile",
        profileData,
    )

    return response.data
}

export async function getMyDoctorAvailabilities({ signal } = {}) {
    const response = await axiosClient.get(
        "/api/v1/doctors/me/availability",
        { signal },
    )

    return response.data
}

export async function createDoctorAvailability(payload) {
    const response = await axiosClient.post(
        "/api/v1/doctors/me/availability",
        payload,
    )

    return response.data
}

export async function updateDoctorAvailability(
    availabilityId,
    payload,
) {
    const response = await axiosClient.put(
        `/api/v1/doctors/me/availability/${availabilityId}`,
        payload,
    )

    return response.data
}

export async function deactivateDoctorAvailability(availabilityId) {
    await axiosClient.delete(
        `/api/v1/doctors/me/availability/${availabilityId}`,
    )
}

export async function reactivateDoctorAvailability(availabilityId) {
    const response = await axiosClient.patch(
        `/api/v1/doctors/me/availability/${availabilityId}/reactivate`,
    )

    return response.data
}

export async function uploadDoctorProfilePhoto(file) {
    if (!(file instanceof File)) {
        throw new Error("Please select a valid image file.")
    }

    const signatureResponse = await axiosClient.get(
        "/doctor/profile/photo-upload-signature",
    )

    const {
        signature,
        timestamp,
        apiKey,
        folder,
        publicId,
        overwrite,
        invalidate,
        uploadUrl,
    } = signatureResponse.data

    const uploadForm = new FormData()
    uploadForm.append("file", file)
    uploadForm.append("api_key", apiKey)
    uploadForm.append("timestamp", timestamp)
    uploadForm.append("signature", signature)
    uploadForm.append("folder", folder)
    uploadForm.append("public_id", publicId)
    uploadForm.append("overwrite", String(overwrite))
    uploadForm.append("invalidate", String(invalidate))

    const cloudinaryResponse = await fetch(uploadUrl, {
        method: "POST",
        body: uploadForm,
    })

    if (!cloudinaryResponse.ok) {
        throw new Error(
            "Profile image upload failed. Please try again.",
        )
    }

    const uploadResult = await cloudinaryResponse.json()

    const confirmationResponse = await axiosClient.put(
        "/doctor/profile/photo",
        {
            secureUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            version: uploadResult.version,
            signature: uploadResult.signature,
        },
    )

    return confirmationResponse.data
}
