import { CheckCircle2, Stethoscope, UserRound } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import doctorAvatar from "../../assets/images/signup-doctor-avatar.png";
import patientAvatar from "../../assets/images/signup-patient-avatar.png";

const ROLE_OPTIONS = [
  {
    value: "PATIENT",
    title: "I'm a Patient",
    description:
      "Find doctors, book appointments and manage your health information.",
    avatar: patientAvatar,
    icon: UserRound,
  },
  {
    value: "DOCTOR",
    title: "I'm a Doctor",
    description:
      "Manage availability, appointments and your professional profile.",
    avatar: doctorAvatar,
    icon: Stethoscope,
  },
];

export default function SignupRoleStep() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedRole = useWatch({ control, name: "role" });

  return (
    <fieldset>
      <legend className="sr-only">Choose your NexCare account type</legend>
      <input
        type="hidden"
        {...register("role", {
          required: "Choose whether you are creating a patient or doctor account",
        })}
      />

      <div role="radiogroup" aria-label="Account type" className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {ROLE_OPTIONS.map((option) => {
          const isSelected = selectedRole === option.value;
          const Icon = option.icon;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => {
                setValue("role", option.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              className={`group relative flex min-h-[250px] flex-col items-center rounded-2xl border-2 px-5 py-5 text-center outline-none transition duration-200 focus-visible:ring-4 focus-visible:ring-[#0EA394]/20 sm:min-h-[275px] sm:px-7 ${
                isSelected
                  ? "border-[#0EA394] bg-[#ECF9F8] shadow-[0_12px_30px_rgba(14,163,148,0.12)]"
                  : "border-[#D9E8EB] bg-white hover:-translate-y-0.5 hover:border-[#8FD6D1] hover:shadow-[0_12px_28px_rgba(16,39,63,0.08)]"
              }`}
            >
              <span
                className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${
                  isSelected
                    ? "border-[#0EA394] bg-[#0EA394] text-white"
                    : "border-[#AFC5CD] bg-white text-transparent"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              </span>

              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[#DFF5F3] sm:h-32 sm:w-32">
                <img
                  src={option.avatar}
                  alt=""
                  className="h-[104px] w-[104px] object-contain sm:h-[120px] sm:w-[120px]"
                />
              </span>

              <span className="mt-4 flex items-center gap-2 text-lg font-extrabold text-[#10273F]">
                <Icon className="h-5 w-5 text-[#0EA394]" aria-hidden="true" />
                {option.title}
              </span>

              <span className="mt-2 max-w-xs text-sm leading-6 text-[#54708A]">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
      {errors.role && (
        <p className="mt-3 text-center text-sm text-red-600" role="alert">
          {errors.role.message}
        </p>
      )}
    </fieldset>
  );
}
