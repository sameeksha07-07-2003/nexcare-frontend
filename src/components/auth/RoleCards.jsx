import { useFormContext, Controller } from "react-hook-form";

const ROLES = [
  { value: "PATIENT", label: "Patient" },
  { value: "DOCTOR", label: "Doctor" },
];

export default function RoleCards() {
  const { control } = useFormContext();

  return (
    <div className="mb-3 sm:mb-4">
      <p className="mb-1.5 text-sm font-semibold text-[#0B2D5C]">I am a</p>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <div
            role="radiogroup"
            aria-label="I am a"
            className="grid grid-cols-2 gap-2 sm:gap-3"
          >
            {ROLES.map(({ value, label }) => {
              const isSelected = field.value === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => field.onChange(value)}
                  className={`w-full rounded-xl border px-2 py-2 text-sm font-semibold transition-colors
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10A9A5]/40 sm:py-2.5 ${
                      isSelected
                        ? "border-[#10A9A5] bg-[#E8F7F6] text-[#10A9A5]"
                        : "border-slate-200 bg-white text-[#0B2D5C] hover:border-[#10A9A5]/50"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}