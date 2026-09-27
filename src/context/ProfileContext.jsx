import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { getMyDoctorProfile } from "../api/doctorApi"
import { getPatientProfile } from "../api/patientApi"
import {
  formatBloodGroup,
  formatDate,
  formatFullName,
  formatGender,
} from "../utils/formatProfile"
import { useAuth } from "./AuthContext"

const ProfileContext = createContext(null)

function normalizeRole(role) {
  return String(role || "").replace(/^ROLE_/, "").toUpperCase()
}

function mapPatientProfile(response, authUser) {
  return {
    accountType: "PATIENT",
    fullName: formatFullName(response.firstName, response.lastName),
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email || authUser?.email,
    phone: response.phoneNumber,
    role: "Patient",
    avatarUrl: response.photoUrl || null,
    gender: formatGender(response.gender),
    genderRaw: response.gender,
    dateOfBirth: formatDate(response.dateOfBirth),
    bloodGroup: formatBloodGroup(response.bloodGroup),
    height: response.height,
    weight: response.weight,
    address: response.address,
    emergencyContact: response.emergencyContact,
  }
}

function mapDoctorProfile(response, authUser) {
  return {
    accountType: "DOCTOR",
    fullName: formatFullName(response.firstName, response.lastName),
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email || authUser?.email,
    phone: response.phoneNumber,
    role: "Doctor",
    avatarUrl: response.profileImageUrl || null,
    medicalRegistrationNumber: response.medicalRegistrationNumber,
    medicalCouncil: response.medicalCouncil,
    registrationDate: response.registrationDate,
    primaryQualification: response.primaryQualification,
    additionalQualification: response.additionalQualification,
    specialization: response.specialization,
    yearOfPassing: response.yearOfPassing,
    placeOfWork: response.placeOfWork,
    city: response.city,
    yearsOfExperience: response.yearsOfExperience,
    bio: response.bio,
    consultationFee: response.consultationFee,
    averageRating: response.averageRating,
    reviewCount: response.reviewCount,
    verificationStatus: response.verificationStatus,
  }
}

function getProfileLoader(role) {
  if (role === "PATIENT") return getPatientProfile
  if (role === "DOCTOR") return getMyDoctorProfile
  return null
}

function mapProfile(role, response, authUser) {
  return role === "DOCTOR"
    ? mapDoctorProfile(response, authUser)
    : mapPatientProfile(response, authUser)
}

export function ProfileProvider({ children }) {
  const { user, role, isAuthenticated } = useAuth()
  const normalizedRole = normalizeRole(role)

  const [profileState, setProfileState] = useState({
    profile: null,
    status: "idle",
    error: "",
  })

  const fetchProfile = useCallback(async ({ signal } = {}) => {
    const loader = getProfileLoader(normalizedRole)

    if (!isAuthenticated || !loader) return null

    const response = await loader({ signal })
    return mapProfile(normalizedRole, response, user)
  }, [isAuthenticated, normalizedRole, user])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    Promise.resolve()
      .then(() => {
        if (!active) return null

        if (!isAuthenticated) {
          setProfileState({ profile: null, status: "idle", error: "" })
          return null
        }

        setProfileState((current) => ({
          ...current,
          status: "loading",
          error: "",
        }))

        return fetchProfile({ signal: controller.signal })
      })
      .then((profile) => {
        if (!active || !isAuthenticated) return
        setProfileState({ profile, status: "success", error: "" })
      })
      .catch((error) => {
        if (!active || error?.code === "ERR_CANCELED") return

        setProfileState({
          profile: null,
          status: "error",
          error:
            error?.response?.data?.message ||
            "We could not load your profile.",
        })
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [fetchProfile, isAuthenticated])

  const loadProfile = useCallback(async () => {
    setProfileState((current) => ({
      ...current,
      status: "loading",
      error: "",
    }))

    try {
      const profile = await fetchProfile()
      setProfileState({ profile, status: "success", error: "" })
      return profile
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "We could not load your profile."

      setProfileState((current) => ({
        ...current,
        status: "error",
        error: message,
      }))
      throw error
    }
  }, [fetchProfile])

  const setAvatarUrl = useCallback((avatarUrl) => {
    setProfileState((current) => ({
      ...current,
      profile: current.profile
        ? { ...current.profile, avatarUrl }
        : current.profile,
    }))
  }, [])

  const value = useMemo(
    () => ({
      profile: profileState.profile,
      status: profileState.status,
      error: profileState.error,
      loadProfile,
      setAvatarUrl,
    }),
    [loadProfile, profileState, setAvatarUrl],
  )

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used inside <ProfileProvider>")
  }
  return context
}
