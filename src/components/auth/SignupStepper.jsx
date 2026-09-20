export default function SignupStepper({ currentStep, totalSteps, label }) {
  return (
    <div className="mb-3 sm:mb-4">
      <div className="mb-2 flex gap-2" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index < currentStep ? "bg-[#10A9A5]" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] font-medium text-[#5B82AA] sm:text-xs">
        Step {currentStep} of {totalSteps} - {label}
      </p>
    </div>
  );
}