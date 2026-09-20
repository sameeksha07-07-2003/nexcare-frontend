import { useId } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const LABEL_CLASS =
  "mb-0.5 block truncate text-sm font-semibold text-[#0B2D5C]";

// Same look as the Step 1 inputs. Fixed height so text, date and select rows line up.
const CONTROL_CLASS =
  "h-[38px] w-full rounded-xl border bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent sm:px-4";

// Icons are hidden on small screens so two-column fields keep enough room for text.
const ICON_CLASS =
  "pointer-events-none absolute left-3.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#8CA9C4] sm:block";

// Registers a field and re-validates it on blur once it has an error
// (same behaviour as Step 1).
function useField(name, rules, { revalidateOnChange = false } = {}) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const field = register(name, rules);

  function revalidate() {
    if (error) trigger(name);
  }

  return {
    error,
    registration: {
      ...field,
      onBlur: (e) => {
        field.onBlur(e);
        revalidate();
      },
      onChange: (e) => {
        field.onChange(e);
        if (revalidateOnChange) revalidate();
      },
    },
  };
}

// The error line always takes its space (h-4), so showing an error never moves
// the fields below it and the Step 2 layout cannot overflow the card.
function FieldShell({ id, label, error, children }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <div className="relative">{children}</div>
      <p
        id={`${id}-error`}
        role="alert"
        title={error?.message}
        className="mt-0.5 h-4 truncate text-xs leading-4 text-red-600"
      >
        {error?.message}
      </p>
    </div>
  );
}

export function TextField({
  name,
  label,
  icon: Icon,
  rules,
  type = "text",
  ...inputProps
}) {
  const id = useId();
  const { error, registration } = useField(name, rules);

  return (
    <FieldShell id={id} label={label} error={error}>
      {Icon && <Icon className={ICON_CLASS} aria-hidden="true" />}
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error`}
        {...inputProps}
        {...registration}
        className={`${CONTROL_CLASS} ${Icon ? "sm:pl-11" : ""} ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  icon: Icon,
  rules,
  options,
  placeholder = "Select",
}) {
  const id = useId();
  const value = useWatch({ name });
  const { error, registration } = useField(name, rules, {
    revalidateOnChange: true,
  });

  return (
    <FieldShell id={id} label={label} error={error}>
      {Icon && <Icon className={ICON_CLASS} aria-hidden="true" />}
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error`}
        {...registration}
        className={`${CONTROL_CLASS} appearance-none pr-9 sm:pr-9 ${
          Icon ? "sm:pl-11" : ""
        } ${value ? "" : "text-gray-400"} ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8CA9C4]"
        aria-hidden="true"
      />
    </FieldShell>
  );
}