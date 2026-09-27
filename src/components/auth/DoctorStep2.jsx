import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  GraduationCap,
  Landmark,
  MapPin,
  Stethoscope,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";

import { TextField } from "./SignupFields";

function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function requiredText(message) {
  return {
    required: message,
    validate: (value) => Boolean(value?.trim()) || message,
  };
}

function SectionTitle({ children, className = "" }) {
  return (
    <div className={`mb-3 mt-1 rounded-xl bg-[#EEF8F7] px-4 py-2.5 text-sm font-bold text-[#0B7773] ${className}`}>
      {children}
    </div>
  );
}

export default function DoctorStep2() {
  const today = getToday();
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <SectionTitle>Registration details</SectionTitle>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        <TextField
          name="medicalRegistrationNumber"
          label="Medical registration number"
          icon={BadgeCheck}
          placeholder="Enter registration number"
          autoComplete="off"
          maxLength={100}
          required
          rules={requiredText("Enter your registration number")}
        />

        <TextField
          name="medicalCouncil"
          label="Medical council"
          icon={Landmark}
          placeholder="Enter medical council"
          autoComplete="off"
          maxLength={150}
          required
          rules={requiredText("Enter your medical council")}
        />

        <TextField
          name="registrationDate"
          label="Registration date"
          type="date"
          icon={CalendarDays}
          max={today}
          required
          rules={{
            required: "Enter your registration date",
            validate: (value) => value <= today || "Registration date cannot be in the future",
          }}
        />

        <TextField
          name="yearOfPassing"
          label="Year of passing"
          icon={Award}
          type="number"
          min="1950"
          max={currentYear}
          step="1"
          placeholder="For example, 2018"
          inputMode="numeric"
          required
          rules={{
            required: "Enter your year of passing",
            min: { value: 1950, message: "Year must be 1950 or later" },
            max: { value: currentYear, message: "Year cannot be in the future" },
          }}
        />
      </div>

      <SectionTitle className="mt-2">Medical expertise</SectionTitle>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        <TextField
          name="primaryQualification"
          label="Primary qualification"
          icon={GraduationCap}
          placeholder="For example, MBBS"
          maxLength={255}
          required
          rules={requiredText("Enter your primary qualification")}
        />

        <TextField
          name="additionalQualification"
          label="Additional qualification"
          icon={Award}
          placeholder="For example, MD General Medicine"
          maxLength={255}
          optionalLabel
        />

        <TextField
          name="specialization"
          label="Specialization"
          icon={Stethoscope}
          placeholder="For example, Cardiologist"
          maxLength={150}
          required
          rules={requiredText("Enter your specialization")}
        />

        <TextField
          name="yearsOfExperience"
          label="Years of experience"
          icon={UserRoundCheck}
          type="number"
          min="0"
          max="80"
          step="1"
          placeholder="For example, 6"
          inputMode="numeric"
          required
          rules={{
            required: "Enter your years of experience",
            min: { value: 0, message: "Experience cannot be negative" },
            max: { value: 80, message: "Enter a valid experience" },
          }}
        />
      </div>

      <SectionTitle className="mt-2">Practice and consultation</SectionTitle>
      <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
        <TextField
          name="placeOfWork"
          label="Place of work"
          icon={Building2}
          placeholder="Hospital or clinic name"
          autoComplete="organization"
          maxLength={255}
          required
          rules={requiredText("Enter your place of work")}
        />

        <TextField
          name="city"
          label="City"
          icon={MapPin}
          placeholder="For example, Bhopal"
          autoComplete="address-level2"
          maxLength={100}
          required
          rules={requiredText("Enter your city")}
        />

        <TextField
          name="consultationFee"
          label="Consultation fee"
          icon={WalletCards}
          type="number"
          min="0"
          step="0.01"
          placeholder="Amount in INR"
          inputMode="decimal"
          required
          helperText="Patients will see this fee before booking."
          className="sm:col-span-2"
          rules={{
            required: "Enter your consultation fee",
            min: { value: 0, message: "Consultation fee cannot be negative" },
            validate: (value) => Number.isFinite(Number(value)) || "Enter a valid consultation fee",
          }}
        />
      </div>
    </div>
  );
}
