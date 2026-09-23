import React from "react";
import { HeartPulse, UserRound, Droplet, Scale, CalendarDays, Ruler } from "lucide-react";
import SectionCard from "../common/SectionCard";
import InfoRow from "../common/InfoRow";

export default function HealthDetailsCard({ profile }) {
  const { gender, dateOfBirth, bloodGroup, height, weight } = profile || {};

  return (
    <SectionCard
      icon={HeartPulse}
      title="Health & Personal Details"
      subtitle="Your health and physical details."
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <InfoRow icon={UserRound} label="Gender" value={gender} />
        <InfoRow icon={CalendarDays} label="Date of Birth" value={dateOfBirth} />
        <InfoRow icon={Droplet} label="Blood Group" value={bloodGroup} />
        <InfoRow icon={Ruler} label="Height" value={height ? `${height} cm` : null} />
        <InfoRow icon={Scale} label="Weight" value={weight ? `${weight} kg` : null} />
      </div>
    </SectionCard>
  );
}