import { useId, useState } from "react";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

const CONTROL_CLASS =
  "h-10 w-full rounded-xl border bg-white px-3.5 text-sm text-[#10273F] outline-none transition placeholder:text-[#8CA9C4] focus:border-[#0EA394] focus:ring-4 focus:ring-[#0EA394]/10 disabled:cursor-not-allowed disabled:bg-slate-50";
function useRegisteredField(name, rules) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return {
    error: errors[name],
    registration: register(name, rules),
  };
}

function FieldShell({ id, label, required, optionalLabel, helperText, error, children }) {
  const descriptionId = `${id}-description`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-[13px] font-semibold text-[#10273F] sm:text-sm">
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        {optionalLabel && <span className="ml-1 font-normal text-[#7890A9]">(optional)</span>}
      </label>

      <div className="relative">{children}</div>

      <div id={descriptionId} className="mt-0.5 min-h-3.5 text-[11px] leading-3.5 sm:text-xs">
        {error ? (
          <p className="text-red-600" role="alert">{error.message}</p>
        ) : helperText ? (
          <p className="text-[#6D84A0]">{helperText}</p>
        ) : null}
      </div>
    </div>
  );
}

export function TextField({
  name,
  label,
  icon: Icon,
  rules,
  required = false,
  optionalLabel = false,
  helperText,
  type = "text",
  className = "",
  ...inputProps
}) {
  const generatedId = useId();
  const id = `signup-${name}-${generatedId}`;
  const { error, registration } = useRegisteredField(name, rules);

  return (
    <div className={className}>
      <FieldShell id={id} label={label} required={required} optionalLabel={optionalLabel} helperText={helperText} error={error}>
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7890A9]" aria-hidden="true" />}
        <input
          id={id}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-description`}
          className={`${CONTROL_CLASS} ${Icon ? "pl-10" : ""} ${error ? "border-red-400" : "border-[#D5E5E8]"}`}
          {...inputProps}
          {...registration}
        />
      </FieldShell>
    </div>
  );
}

export function PasswordField({ name, label, rules, helperText, className = "", autoComplete }) {
  const generatedId = useId();
  const id = `signup-${name}-${generatedId}`;
  const [isVisible, setIsVisible] = useState(false);
  const { error, registration } = useRegisteredField(name, rules);

  return (
    <div className={className}>
      <FieldShell id={id} label={label} required helperText={helperText} error={error}>
        <input
          id={id}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-description`}
          className={`${CONTROL_CLASS} pr-11 ${error ? "border-red-400" : "border-[#D5E5E8]"}`}
          {...registration}
        />
        <button
          type="button"
          onClick={() => setIsVisible((current) => !current)}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-[#6D84A0] transition hover:bg-[#EEF8F7] hover:text-[#0B8F86] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA394]"
          aria-label={isVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {isVisible ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
        </button>
      </FieldShell>
    </div>
  );
}

export function SelectField({
  name,
  label,
  icon: Icon,
  rules,
  options,
  required = false,
  optionalLabel = false,
  helperText,
  placeholder = "Select an option",
  className = "",
}) {
  const generatedId = useId();
  const id = `signup-${name}-${generatedId}`;
  const { control } = useFormContext();
  const value = useWatch({ control, name });
  const { error, registration } = useRegisteredField(name, rules);

  return (
    <div className={className}>
      <FieldShell id={id} label={label} required={required} optionalLabel={optionalLabel} helperText={helperText} error={error}>
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7890A9]" aria-hidden="true" />}
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={`${id}-description`}
          className={`${CONTROL_CLASS} appearance-none pr-10 ${Icon ? "pl-10" : ""} ${value ? "text-[#10273F]" : "text-[#7890A9]"} ${error ? "border-red-400" : "border-[#D5E5E8]"}`}
          {...registration}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-[#10273F]">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7890A9]" aria-hidden="true" />
      </FieldShell>
    </div>
  );
}
