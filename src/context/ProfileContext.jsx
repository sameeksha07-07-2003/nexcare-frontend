// src/context/ProfileContext.jsx
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getPatientProfile } from "../api/patientApi";
import { useAuth } from "./AuthContext";
import {
  formatFullName,
  formatGender,
  formatBloodGroup,
  formatDate,
} from "../utils/formatProfile";

const ProfileContext = createContext(null);

// Maps the real backend PatientProfileResponse -> what our components expect.
function mapProfile(apiResponse, authUser) {
  if (!apiResponse) return null;
  return {
    fullName: formatFullName(apiResponse.firstName, apiResponse.lastName),
    email: apiResponse.email || authUser?.email,
    phone: apiResponse.phoneNumber,
    role: "Patient",
    isActive: true,
    avatarUrl: apiResponse.photoUrl || null, // backend needs to add this field — see note below
    gender: formatGender(apiResponse.gender),
    genderRaw: apiResponse.gender,
    dateOfBirth: formatDate(apiResponse.dateOfBirth),
    bloodGroup: formatBloodGroup(apiResponse.bloodGroup),
    height: apiResponse.height,
    weight: apiResponse.weight,
    address: apiResponse.address,
    emergencyContact: apiResponse.emergencyContact,
  };
}

export function ProfileProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const loadProfile = useCallback(() => {
    if (!isAuthenticated) return;
    setStatus("loading");
    getPatientProfile()
      .then((res) => {
        setProfile(mapProfile(res, user));
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }, [isAuthenticated, user]);

  // Fetch once, as soon as the user is logged in — this is what keeps
  // Topbar and ProfileHero in sync without either of them re-fetching.
  useEffect(() => {
    if (isAuthenticated) {
      loadProfile();
    } else {
      setProfile(null);
      setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Called right after a successful photo upload so every consumer
  // (Topbar avatar + ProfileHero avatar) updates instantly, no refetch needed.
  const setAvatarUrl = useCallback((url) => {
    setProfile((prev) => (prev ? { ...prev, avatarUrl: url } : prev));
  }, []);

  const value = { profile, status, loadProfile, setAvatarUrl };
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside <ProfileProvider>");
  return ctx;
}