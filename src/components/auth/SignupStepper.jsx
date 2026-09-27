import { Check } from "lucide-react";

export default function SignupStepper({ currentStep, steps }) {
  return (
    <nav aria-label="Signup progress" className="mx-auto w-full max-w-3xl">
      <ol className="flex items-start">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <li key={label} className="flex min-w-0 flex-1 items-start last:flex-none">
              <div className="flex min-w-0 flex-col items-center">
                <span
                  aria-current={isActive ? "step" : undefined}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors sm:h-9 sm:w-9 ${
                    isComplete
                      ? "border-[#0EA394] bg-[#0EA394] text-white"
                      : isActive
                        ? "border-[#0EA394] bg-white text-[#0B8F86] shadow-[0_0_0_4px_rgba(14,163,148,0.12)]"
                        : "border-[#CFE1E5] bg-white text-[#7890A9]"
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : stepNumber}
                </span>
                <span className={`mt-2 hidden whitespace-nowrap text-xs font-semibold sm:block ${isActive ? "text-[#10273F]" : "text-[#6D84A0]"}`}>
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span className={`mt-4 h-px min-w-5 flex-1 sm:mt-[18px] sm:min-w-12 ${isComplete ? "bg-[#0EA394]" : "bg-[#CFE1E5]"}`} aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
