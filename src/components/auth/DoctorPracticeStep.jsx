import { Building2, MapPin, WalletCards } from "lucide-react";

import { TextField } from "./SignupFields";

function requiredText(message) {
  return {
    required: message,
    validate: (value) => Boolean(value?.trim()) || message,
  };
}

export default function DoctorPracticeStep() {
  return (
    <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2 lg:grid-cols-3">
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
        rules={{
          required: "Enter your consultation fee",
          min: {
            value: 0,
            message: "Consultation fee cannot be negative",
          },
          validate: (value) =>
            Number.isFinite(Number(value)) ||
            "Enter a valid consultation fee",
        }}
      />

      <div className="rounded-2xl border border-[#CFE8E8] bg-[#F0FAF9] p-4 sm:col-span-2 lg:col-span-3">
        <p className="text-sm font-semibold text-[#10273F]">
          What happens after signup?
        </p>
        <p className="mt-1 text-sm leading-6 text-[#54708A]">
          Your account will be created immediately, but your public doctor
          profile will remain pending until NexCare verifies your professional
          information.
        </p>
      </div>
    </div>
  );
}
