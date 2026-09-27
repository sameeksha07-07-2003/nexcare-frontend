import {
  CalendarDays,
  Droplets,
  MapPin,
  PhoneCall,
  Ruler,
  UserRound,
  Weight,
} from "lucide-react";

import {
  SelectField,
  TextField,
} from "./SignupFields";

const GENDER_OPTIONS = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
  {
    value: "OTHER",
    label: "Other",
  },
  {
    value: "PREFER_NOT_TO_SAY",
    label: "Prefer not to say",
  },
];

const BLOOD_GROUP_OPTIONS = [
  {
    value: "A_POSITIVE",
    label: "A+",
  },
  {
    value: "A_NEGATIVE",
    label: "A-",
  },
  {
    value: "B_POSITIVE",
    label: "B+",
  },
  {
    value: "B_NEGATIVE",
    label: "B-",
  },
  {
    value: "AB_POSITIVE",
    label: "AB+",
  },
  {
    value: "AB_NEGATIVE",
    label: "AB-",
  },
  {
    value: "O_POSITIVE",
    label: "O+",
  },
  {
    value: "O_NEGATIVE",
    label: "O-",
  },
];

function getToday() {
  const now = new Date();

  const month = String(
    now.getMonth() + 1,
  ).padStart(2, "0");

  const day = String(
    now.getDate(),
  ).padStart(2, "0");

  return `${now.getFullYear()}-${month}-${day}`;
}

function optionalNumber(
  min,
  max,
  message,
) {
  return (value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return true;
    }

    const parsed = Number(value);

    return (
      (
        Number.isFinite(parsed) &&
        parsed >= min &&
        parsed <= max
      ) ||
      message
    );
  };
}

export default function PatientStep2() {
  const today = getToday();

  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
      <SelectField
        name="gender"
        label="Gender"
        icon={UserRound}
        options={GENDER_OPTIONS}
        placeholder="Select gender"
        required
        rules={{
          required:
            "Select your gender",
        }}
      />

      <TextField
        name="dateOfBirth"
        label="Date of birth"
        type="date"
        icon={CalendarDays}
        max={today}
        required
        rules={{
          required:
            "Enter your date of birth",

          validate: (value) =>
            value <= today ||
            "Date of birth cannot be in the future",
        }}
      />

      <SelectField
        name="bloodGroup"
        label="Blood group"
        icon={Droplets}
        options={BLOOD_GROUP_OPTIONS}
        placeholder="Select blood group"
        optionalLabel
      />

      <TextField
        name="emergencyContact"
        label="Emergency contact"
        type="tel"
        icon={PhoneCall}
        placeholder="Contact number"
        autoComplete="tel"
        inputMode="tel"
        maxLength={20}
        optionalLabel
        rules={{
          pattern: {
            value:
              /^\+?[0-9\s-]{7,20}$/,

            message:
              "Enter a valid contact number",
          },
        }}
      />

      <TextField
        name="height"
        label="Height"
        icon={Ruler}
        type="number"
        min="30"
        max="272"
        step="0.1"
        placeholder="Height in cm"
        inputMode="decimal"
        optionalLabel
        rules={{
          validate: optionalNumber(
            30,
            272,
            "Enter a height between 30 and 272 cm",
          ),
        }}
      />

      <TextField
        name="weight"
        label="Weight"
        icon={Weight}
        type="number"
        min="1"
        max="500"
        step="0.1"
        placeholder="Weight in kg"
        inputMode="decimal"
        optionalLabel
        rules={{
          validate: optionalNumber(
            1,
            500,
            "Enter a weight between 1 and 500 kg",
          ),
        }}
      />

      <TextField
        name="address"
        label="Address"
        icon={MapPin}
        placeholder="House number, street and city"
        autoComplete="street-address"
        maxLength={500}
        optionalLabel
        className="sm:col-span-2 lg:col-span-4"
      />
    </div>
  );
}