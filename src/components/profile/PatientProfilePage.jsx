import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import AppShell from "../layout/AppShell";
import ProfileHero from "./ProfileHero";
import PersonalInfoCard from "./PersonalInfoCard";
import HealthDetailsCard from "./HealthDetailsCard";
import AddressEmergencyCard from "./AddressEmergencyCard";
import ProfileSecurityCard from "./ProfileSecurityCard";

import { getPatientProfile } from "../../api/patientApi";
import { useAuth } from "../../context/AuthContext";
import {
  formatGender,
  formatBloodGroup,
  formatDate,
  formatFullName,
} from "../../utils/formatProfile";

// Maps the real backend PatientProfileResponse shape -> what our cards expect.
// Backend fields: email, firstName, lastName, phoneNumber, gender, dateOfBirth,
// bloodGroup, address, emergencyContact (plain string), height, weight.
function mapProfile(apiResponse, authUser) {
  if (!apiResponse) return null;
  return {
    fullName: formatFullName(apiResponse.firstName, apiResponse.lastName),
    email: apiResponse.email || authUser?.email,
    phone: apiResponse.phoneNumber,
    role: "Patient",
    isActive: true, // backend has no status field yet; assume active once logged in
    avatarUrl: null, // backend has no photo field yet; Avatar falls back to gender default
    gender: formatGender(apiResponse.gender),
    genderRaw: apiResponse.gender, // used by Avatar for the default illustration
    dateOfBirth: formatDate(apiResponse.dateOfBirth),
    bloodGroup: formatBloodGroup(apiResponse.bloodGroup),
    height: apiResponse.height,
    weight: apiResponse.weight,
    address: apiResponse.address,
    emergencyContact: apiResponse.emergencyContact,
  };
}

function ProfileSkeleton() {
  const pulse = "animate-pulse rounded-[14px] bg-[#EAF4F3]";
  return (
    <div>
      <div className={`mb-4 h-[124px] ${pulse}`} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)]">
        <div className="space-y-4">
          <div className={`h-[220px] ${pulse}`} />
          <div className={`h-[260px] ${pulse}`} />
        </div>
        <div className="space-y-4">
          <div className={`h-[220px] ${pulse}`} />
          <div className={`h-[160px] ${pulse}`} />
        </div>
      </div>
    </div>
  );
}

function ProfileError({ onRetry }) {
  return (
    <div className="rounded-[14px] border border-[#DCEDEF] bg-white p-8 text-center">
      <h2 className="text-[17px] font-bold text-[#10273F]">Unable to load your profile</h2>
      <p className="mt-1 text-[14px] text-[#54708A]">
        We couldn't retrieve your profile information right now.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-[10px] bg-[#0EA394] px-5 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#0B7F73]"
      >
        Try Again
      </button>
    </div>
  );
}

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  const loadProfile = () => {
    setStatus("loading");
    getPatientProfile()
      .then((res) => {
        // getPatientProfile() already returns the parsed body (see patientApi.js) —
        // do NOT read res.data again here.
        setProfile(mapProfile(res, user));
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell user={user}>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-[#10273F] sm:text-[26px] md:text-[28px]">
            My Profile
          </h1>
          <p className="text-[13px] text-[#54708A] sm:text-[14px]">
            Manage your personal information and health details.
          </p>
        </div>
        <button
          className="flex w-fit items-center gap-2 rounded-[10px] bg-[#0EA394] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[#0B7F73]"
          onClick={() => {
            // Wire to your existing edit routing/modal implementation.
          }}
        >
          <Pencil size={16} aria-hidden="true" /> Edit Profile
        </button>
      </div>

      {status === "loading" && <ProfileSkeleton />}
      {status === "error" && <ProfileError onRetry={loadProfile} />}

      {status === "success" && (
        <>
          <ProfileHero profile={profile} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.95fr)]">
            <div>
              <PersonalInfoCard profile={profile} />
              <HealthDetailsCard profile={profile} />
            </div>
            <div>
              <AddressEmergencyCard profile={profile} />
              <ProfileSecurityCard />
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}