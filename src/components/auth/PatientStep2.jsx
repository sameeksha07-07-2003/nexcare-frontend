import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Calendar,
  Droplet,
  MapPin,
  PhoneCall,
  Ruler,
  User,
  Weight,
} from "lucide-react";
import { SelectField, TextField } from "./SignupFields";

const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
  { value: "PREFER_NOT_TO_SAY", label: "Prefer not to say" },
];

const BLOOD_GROUP_OPTIONS = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
];

// yyyy-mm-dd in local time, the format <input type="date"> uses.
function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Optional numeric field: empty is fine, otherwise it must be a number in range.
function optionalNumberInRange(min, max, message) {
  return (value) => {
    if (!value) return true;
    const number = Number(value);
    return (Number.isFinite(number) && number >= min && number <= max) || message;
  };
}

export default function PatientStep2() {
  const { setFocus } = useFormContext();
  const today = getToday();

  useEffect(() => {
    setFocus("gender");
  }, [setFocus]);

  return (
    <div className="grid grid-cols-2 gap-x-3">
      <SelectField
        name="gender"
        label="Gender"
        icon={User}
        options={GENDER_OPTIONS}
        rules={{ required: "Select gender" }}
      />
      <TextField
        name="dateOfBirth"
        label="Date of birth"
        type="date"
        icon={Calendar}
        max={today}
        rules={{
          required: "Enter date of birth",
          validate: (value) => value <= today || "Invalid date",
        }}
      />

      <SelectField
        name="bloodGroup"
        label="Blood group"
        icon={Droplet}
        options={BLOOD_GROUP_OPTIONS}
      />
      <TextField
        name="emergencyContact"
        label="Emergency no."
        type="tel"
        icon={PhoneCall}
        placeholder="Contact number"
        autoComplete="off"
        rules={{
          pattern: {
            value: /^\+?[0-9\s-]{7,20}$/,
            message: "Invalid number",
          },
        }}
      />

      <TextField
        name="height"
        label="Height (cm)"
        icon={Ruler}
        inputMode="decimal"
        placeholder="e.g. 165"
        rules={{ validate: optionalNumberInRange(30, 272, "Invalid height") }}
      />
      <TextField
        name="weight"
        label="Weight (kg)"
        icon={Weight}
        inputMode="decimal"
        placeholder="e.g. 58"
        rules={{ validate: optionalNumberInRange(1, 500, "Invalid weight") }}
      />

      <div className="col-span-2">
        <TextField
          name="address"
          label="Address"
          icon={MapPin}
          placeholder="House no., street, city"
          autoComplete="street-address"
        />
      </div>
    </div>
  );
}