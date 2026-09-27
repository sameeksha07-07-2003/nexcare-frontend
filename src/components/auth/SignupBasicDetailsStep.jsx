import { Mail, Phone, UserRound } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { PasswordField, TextField } from "./SignupFields";

const PASSWORD_RULES = {
  required: "Enter a password",
  minLength: {
    value: 8,
    message: "Use at least 8 characters",
  },
  maxLength: {
    value: 128,
    message: "Password must not exceed 128 characters",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
    message: "Include uppercase, lowercase, number and special character",
  },
};

function requiredTrimmed(message) {
  return {
    required: message,
    validate: (value) => Boolean(value?.trim()) || message,
  };
}

export default function SignupBasicDetailsStep() {
  const { control } = useFormContext();
  const password = useWatch({ control, name: "password" });

  return (
    <div className="grid grid-cols-1 gap-x-5 sm:grid-cols-2">
      <TextField
        name="firstName"
        label="First name"
        icon={UserRound}
        placeholder="Enter your first name"
        autoComplete="given-name"
        maxLength={100}
        required
        rules={requiredTrimmed("Enter your first name")}
      />

      <TextField
        name="lastName"
        label="Last name"
        icon={UserRound}
        placeholder="Enter your last name"
        autoComplete="family-name"
        maxLength={100}
        required
        rules={requiredTrimmed("Enter your last name")}
      />

      <TextField
        name="email"
        label="Email address"
        type="email"
        icon={Mail}
        placeholder="name@example.com"
        autoComplete="email"
        inputMode="email"
        maxLength={320}
        required
        rules={{
          required: "Enter your email address",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
      />

      <TextField
        name="phoneNumber"
        label="Phone number"
        type="tel"
        icon={Phone}
        placeholder="Enter your phone number"
        autoComplete="tel"
        inputMode="tel"
        maxLength={20}
        required
        rules={{
          required: "Enter your phone number",
          pattern: {
            value: /^[0-9+() -]{7,20}$/,
            message: "Enter a valid phone number",
          },
        }}
      />

      <PasswordField
        name="password"
        label="Password"
        autoComplete="new-password"
        rules={PASSWORD_RULES}
        helperText="At least 8 characters with uppercase, lowercase, number and symbol."
      />

      <PasswordField
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        rules={{
          required: "Confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        }}
      />
    </div>
  );
}
