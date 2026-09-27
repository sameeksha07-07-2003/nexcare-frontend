import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import {
  useFormContext,
  useWatch,
} from "react-hook-form";

import RoleCards from "./RoleCards";

const INPUT_CLASS = `
  h-11 w-full rounded-xl border bg-white
  pl-11 pr-4
  text-sm text-[#10273F]
  outline-none transition
  placeholder:text-[#8CA9C4]
  focus:border-transparent
  focus:ring-2 focus:ring-[#10A9A5]
`;

function FieldError({ error }) {
  return (
    <p
      className="mt-1 min-h-4 text-xs text-red-600"
      role={error ? "alert" : undefined}
    >
      {error?.message}
    </p>
  );
}

export default function SignupAccountStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const password = useWatch({
    control,
    name: "password",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmation,
    setShowConfirmation,
  ] = useState(false);

  const passwordRules = {
    required: "Enter a password",

    minLength: {
      value: 8,
      message: "Use at least 8 characters",
    },

    validate: {
      uppercase: (value) =>
        /[A-Z]/.test(value) ||
        "Add an uppercase letter",

      lowercase: (value) =>
        /[a-z]/.test(value) ||
        "Add a lowercase letter",

      number: (value) =>
        /\d/.test(value) ||
        "Add a number",

      special: (value) =>
        /[^A-Za-z0-9]/.test(value) ||
        "Add a special character",
    },
  };

  const accountFields = [
    {
      name: "firstName",
      label: "First name",
      icon: User,
      placeholder: "Riya",
      autoComplete: "given-name",
      rules: {
        required: "Enter your first name",
        validate: (value) =>
          Boolean(value.trim()) ||
          "Enter your first name",
      },
    },
    {
      name: "lastName",
      label: "Last name",
      icon: User,
      placeholder: "Sharma",
      autoComplete: "family-name",
      rules: {
        required: "Enter your last name",
        validate: (value) =>
          Boolean(value.trim()) ||
          "Enter your last name",
      },
    },
    {
      name: "email",
      label: "Email address",
      icon: Mail,
      placeholder: "name@example.com",
      autoComplete: "email",
      type: "email",
      rules: {
        required: "Enter your email address",
        pattern: {
          value:
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message:
            "Enter a valid email address",
        },
      },
    },
    {
      name: "phoneNumber",
      label: "Phone number",
      icon: Phone,
      placeholder:
        "Enter your phone number",
      autoComplete: "tel",
      type: "tel",
      rules: {
        required: "Enter your phone number",
        pattern: {
          value: /^[0-9+() -]{7,20}$/,
          message:
            "Enter a valid phone number",
        },
      },
    },
  ];

  return (
    <div>
      <RoleCards />

      <div className="mt-5 grid gap-x-4 sm:grid-cols-2">
        {accountFields.map(
          ({
            name,
            label,
            icon: Icon,
            rules,
            ...inputProps
          }) => (
            <div
              key={name}
              className={
                name === "email" ||
                name === "phoneNumber"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <label
                htmlFor={name}
                className="mb-1.5 block text-sm font-semibold text-[#0B2D5C]"
              >
                {label}{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <div className="relative">
                <Icon
                  className="
                    pointer-events-none
                    absolute left-3.5 top-1/2
                    h-4 w-4 -translate-y-1/2
                    text-[#8CA9C4]
                  "
                  aria-hidden="true"
                />

                <input
                  id={name}
                  className={`
                    ${INPUT_CLASS}
                    ${
                      errors[name]
                        ? "border-red-400"
                        : "border-[#DCEDEF]"
                    }
                  `}
                  {...inputProps}
                  {...register(name, rules)}
                />
              </div>

              <FieldError
                error={errors[name]}
              />
            </div>
          ),
        )}
      </div>

      <div className="grid gap-x-4 sm:grid-cols-2">
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-[#0B2D5C]"
          >
            Password{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <Lock
              className="
                pointer-events-none
                absolute left-3.5 top-1/2
                h-4 w-4 -translate-y-1/2
                text-[#8CA9C4]
              "
              aria-hidden="true"
            />

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              placeholder="Create a password"
              className={`
                ${INPUT_CLASS}
                pr-11
                ${
                  errors.password
                    ? "border-red-400"
                    : "border-[#DCEDEF]"
                }
              `}
              {...register(
                "password",
                passwordRules,
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (currentValue) =>
                    !currentValue,
                )
              }
              className="
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-[#7890A9]
                transition-colors
                hover:text-[#0EA394]
              "
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <FieldError
            error={errors.password}
          />
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-1.5 block text-sm font-semibold text-[#0B2D5C]"
          >
            Confirm password{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <div className="relative">
            <Lock
              className="
                pointer-events-none
                absolute left-3.5 top-1/2
                h-4 w-4 -translate-y-1/2
                text-[#8CA9C4]
              "
              aria-hidden="true"
            />

            <input
              id="confirmPassword"
              type={
                showConfirmation
                  ? "text"
                  : "password"
              }
              autoComplete="new-password"
              placeholder="Repeat your password"
              className={`
                ${INPUT_CLASS}
                pr-11
                ${
                  errors.confirmPassword
                    ? "border-red-400"
                    : "border-[#DCEDEF]"
                }
              `}
              {...register(
                "confirmPassword",
                {
                  required:
                    "Confirm your password",

                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                },
              )}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmation(
                  (currentValue) =>
                    !currentValue,
                )
              }
              className="
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-[#7890A9]
                transition-colors
                hover:text-[#0EA394]
              "
              aria-label={
                showConfirmation
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
            >
              {showConfirmation ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <FieldError
            error={errors.confirmPassword}
          />
        </div>
      </div>

      <p className="mt-1 text-xs leading-5 text-[#54708A]">
        Use at least 8 characters with
        uppercase, lowercase, number and
        special character.
      </p>
    </div>
  );
}