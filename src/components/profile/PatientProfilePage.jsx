import React from "react";
import { Pencil } from "lucide-react";
import AppShell from "../layout/AppShell";
import ProfileHero from "./ProfileHero";
import PersonalInfoCard from "./PersonalInfoCard";
import HealthDetailsCard from "./HealthDetailsCard";
import AddressEmergencyCard from "./AddressEmergencyCard";
import ProfileSecurityCard from "./ProfileSecurityCard";
import { useProfile } from "../../context/ProfileContext";

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
  const { profile, status, loadProfile, setAvatarUrl } = useProfile();

  return (
    <AppShell>
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

      {(status === "loading" || status === "idle") && <ProfileSkeleton />}
      {status === "error" && <ProfileError onRetry={loadProfile} />}

      {status === "success" && (
        <>
          <ProfileHero profile={profile} onAvatarUploaded={setAvatarUrl} />
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