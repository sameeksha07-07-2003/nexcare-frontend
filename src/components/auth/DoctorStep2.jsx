import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  CalendarCheck,
  GraduationCap,
  Landmark,
  Stethoscope,
} from "lucide-react";
import { TextField } from "./SignupFields";

const EARLIEST_PASSING_YEAR = 1940;

// yyyy-mm-dd in local time, the format <input type="date"> uses.
function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Required text field: an empty or spaces-only value is not accepted.
function requiredText(message) {
  return { validate: (value) => Boolean(value?.trim()) || message };
}

export default function DoctorStep2() {
  const { setFocus } = useFormContext();
  const today = getToday();
  const currentYear = new Date().getFullYear();

  // The Continue button disappears on Step 2, so move focus to the first field.
  // Skipped on touch screens, where it would open the keyboard straight away.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setFocus("medicalRegistrationNumber");
    }
  }, [setFocus]);

  return (
    <div className="grid grid-cols-2 gap-x-3">
      <TextField
        name="medicalRegistrationNumber"
        label="Reg. number"
        icon={BadgeCheck}
        placeholder="Registration no."
        autoComplete="off"
        rules={requiredText("Enter reg. number")}
      />
      <TextField
        name="medicalCouncil"
        label="Council"
        icon={Landmark}
        placeholder="Medical council"
        autoComplete="off"
        rules={requiredText("Enter council")}
      />

      <TextField
        name="registrationDate"
        label="Reg. date"
        type="date"
        icon={Calendar}
        max={today}
        rules={{
  required: "Enter reg. date",
  validate: (value) => value <= today || "Invalid date",
}}
      />
      <TextField
        name="yearOfPassing"
        label="Passing year"
        icon={CalendarCheck}
        inputMode="numeric"
        maxLength={4}
        placeholder="e.g. 2015"
        autoComplete="off"
        rules={{
          validate: (value) => {
            if (!value) return true;
            const year = Number(value);
            return (
              (Number.isInteger(year) &&
                year >= EARLIEST_PASSING_YEAR &&
                year <= currentYear) ||
              "Invalid year"
            );
          },
        }}
      />

      <TextField
        name="specialization"
        label="Specialization"
        icon={Stethoscope}
        placeholder="e.g. Cardiology"
        autoComplete="off"
        rules={requiredText("Enter specialization")}
      />
      <TextField
        name="placeOfWork"
        label="Place of work"
        icon={Building2}
        placeholder="Hospital / clinic"
        autoComplete="organization"
      />

      <div className="col-span-2">
        <TextField
          name="primaryQualification"
          label="Primary qualification"
          icon={GraduationCap}
          placeholder="e.g. MBBS"
          autoComplete="off"
          rules={requiredText("Enter qualification")}
        />
      </div>
      <div className="col-span-2">
        <TextField
          name="additionalQualification"
          label="Additional qualification"
          icon={Award}
          placeholder="e.g. MD (General Medicine)"
          autoComplete="off"
        />
      </div>
    </div>
  );
}