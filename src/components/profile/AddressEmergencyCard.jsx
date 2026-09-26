import React from "react";
import { MapPin, House, Phone } from "lucide-react";
import SectionCard from "../common/SectionCard";

export default function AddressEmergencyCard({ profile }) {
  const { address, emergencyContact } = profile || {};

  return (
    <SectionCard
      icon={MapPin}
      title="Address & Emergency Contact"
      subtitle="Your contact and location details."
      className="mb-4"
    >
      <div className="space-y-3">
        <div className="flex gap-3 rounded-[10px] bg-[#F2F9FA] p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DBF4F5] text-[#04949D]">
            <House size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] text-[#54708A]">Address</p>
            <p className="text-[14px] font-semibold leading-snug text-[#10273F]">
              {address || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex gap-3 rounded-[10px] bg-[#F2F9FA] p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DBF4F5] text-[#04949D]">
            <Phone size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[12px] text-[#54708A]">Emergency Contact</p>
            <p className="text-[14px] font-semibold leading-snug text-[#10273F]">
              {emergencyContact || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}