import React from "react";
import { UserRound, Mail, Phone } from "lucide-react";
import SectionCard from "../common/SectionCard";
import InfoRow from "../common/InfoRow";

export default function PersonalInfoCard({ profile }) {
  const { fullName, email, phone } = profile || {};

  return (
    <SectionCard
      icon={UserRound}
      title="Personal Information"
      subtitle="Your account details (read-only)"
      className="mb-4"
    >
      <div className="space-y-3">
        <InfoRow icon={UserRound} label="Full Name" value={fullName} />
        <InfoRow icon={Mail} label="Email Address" value={email} />
        <InfoRow icon={Phone} label="Phone Number" value={phone} />
      </div>
    </SectionCard>
  );
}