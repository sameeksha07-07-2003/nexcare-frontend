import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import SignupStepper from "./SignupStepper";
import RoleCards from "./RoleCards";
import { buildSignupPayload } from "../../utils/buildSignupPayload";
import PatientStep2 from "./PatientStep2";
import DoctorStep2 from "./DoctorStep2";

const STEP_1_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "password",
  "confirmPassword",
  "role",
];

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "Use 8 or more characters" };

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Weak", "Weak", "Fair", "Good", "Strong"];
  return { score, label: labels[score] };
}

function Step1Fields() {
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValue = watch("password");
  const strength = getPasswordStrength(passwordValue);

  function withBlurRevalidate(name, rules) {
    const field = register(name, rules);
    return {
      ...field,
      onBlur: (e) => {
        field.onBlur(e);
        if (errors[name]) {
          trigger(name);
        }
      },
    };
  }

  return (
    <div>
      <RoleCards />

      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
            First name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              {...withBlurRevalidate("firstName", { required: "First name is required" })}
              className={`w-full pl-11 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
                errors.firstName ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Riya"
            />
          </div>
          {errors.firstName && (
            <p className="text-red-600 text-xs mt-0.5">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
            Last name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              {...withBlurRevalidate("lastName", { required: "Last name is required" })}
              className={`w-full pl-11 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
                errors.lastName ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Sharma"
            />
          </div>
          {errors.lastName && (
            <p className="text-red-600 text-xs mt-0.5">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="mb-2">
        <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
          Email address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            {...withBlurRevalidate("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className={`w-full pl-11 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
              errors.email ? "border-red-400" : "border-slate-200"
            }`}
            placeholder="Enter your email address"
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-xs mt-0.5">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-2">
        <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
          Phone number
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            {...withBlurRevalidate("phoneNumber", { required: "Phone number is required" })}
            className={`w-full pl-11 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
              errors.phoneNumber ? "border-red-400" : "border-slate-200"
            }`}
            placeholder="Enter your phone number"
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-600 text-xs mt-0.5">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-1">
        <div>
          <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? "text" : "password"}
              {...withBlurRevalidate("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              className={`w-full pl-11 pr-10 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
                errors.password ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8CA9C4]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs mt-0.5">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="text-[#0B2D5C] text-sm font-semibold mb-0.5 block">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#8CA9C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...withBlurRevalidate("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              className={`w-full pl-11 pr-10 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#10A9A5] focus:border-transparent ${
                errors.confirmPassword ? "border-red-400" : "border-slate-200"
              }`}
              placeholder="Repeat your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8CA9C4]"
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs mt-0.5">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-1.5 mb-0.5">
        {[0, 1, 2, 3].map((segmentIndex) => (
          <div
            key={segmentIndex}
            className={`h-1 flex-1 rounded-full ${
              segmentIndex < strength.score ? "bg-[#10A9A5]" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="text-[#5B82AA] text-xs mb-2">{strength.label}</p>
    </div>
  );
}

const STEP_2_COPY = {
  PATIENT: {
    title: "Health details",
    subtitle: "Share a few details to help us personalise your care.",
  },
  DOCTOR: {
    title: "Professional details",
    subtitle: "Add your registration and qualification details.",
  },
};

export default function SignupForm() {
  const [step, setStep] = useState(1);

  const formMethods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "PATIENT",
      // Step 2 - Patient
      gender: "",
      dateOfBirth: "",
      bloodGroup: "",
      emergencyContact: "",
      height: "",
      weight: "",
      address: "",
      // Step 2 - Doctor
      medicalRegistrationNumber: "",
      medicalCouncil: "",
      registrationDate: "",
      yearOfPassing: "",
      specialization: "",
      placeOfWork: "",
      primaryQualification: "",
      additionalQualification: "",
    
    },
  });

  const {
    trigger,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;
  const selectedRole = watch("role");
  const step2Copy = STEP_2_COPY[selectedRole] ?? STEP_2_COPY.PATIENT;

  async function goToStep2() {
    const isStep1Valid = await trigger(STEP_1_FIELDS);
    if (isStep1Valid) {
      setStep(2);
    }
  }

  function goBackToStep1() {
    setStep(1);
  }

  // Step 2 UI only for now: builds the backend payload, the API call is wired later.
  function onSubmit(values) {
    return buildSignupPayload(values);
  }

  return (
    <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-lg p-5 sm:p-7">
      <FormProvider {...formMethods}>
        {/*
          Step 1 always stays in the normal flow, so it alone decides the card size.
          On step 2 it is only made invisible (still takes its space), and step 2 is
          laid over it with absolute inset-0. That keeps the card exactly the same
          size on both steps.
        */}
        <div className="relative">
          <div className={step === 1 ? undefined : "invisible"}>
            <SignupStepper currentStep={1} totalSteps={2} label="Account details" />
            <h2 className="text-[#0B2D5C] font-extrabold text-xl mb-0.5">
              Create your account
            </h2>
            <p className="text-[#5B82AA] text-sm mb-3">
              Join NexCare and take the first step towards better health.
            </p>

            <Step1Fields />

            <button
              type="button"
              onClick={goToStep2}
              className="w-full mt-2 bg-gradient-to-r from-[#14B8B3] to-[#0E8C88] text-white font-semibold rounded-xl py-2.5 hover:opacity-90 active:scale-[0.98] transition"
            >
              Continue →
            </button>

            <div className="flex items-center gap-3 my-2.5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[#5B82AA] text-xs">OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              type="button"
              className="w-full border border-slate-200 rounded-xl py-1.5 text-sm font-medium text-[#0B2D5C] flex items-center justify-center gap-2"
            ><svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              Continue with Google
            </button>
          </div>

          {step === 2 && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="absolute inset-0 flex flex-col"
            >
              <div className="shrink-0">
                <SignupStepper currentStep={2} totalSteps={2} label="Profile details" />
                <h2 className="text-[#0B2D5C] font-extrabold text-xl mb-0.5">
                  {step2Copy.title}
                </h2>
                <p className="text-[#5B82AA] text-sm mb-3">{step2Copy.subtitle}</p>
              </div>

              <div className="min-h-0 flex-1">
                {selectedRole === "DOCTOR" ? <DoctorStep2 /> : <PatientStep2 />}
              </div>

              <div className="grid shrink-0 grid-cols-[auto_1fr] gap-3 pt-3">
                <button
                  type="button"
                  onClick={goBackToStep1}
                  className="rounded-xl border border-slate-200 px-5 text-sm font-medium text-[#0B2D5C] hover:bg-slate-50 transition"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#14B8B3] to-[#0E8C88] text-white font-semibold rounded-xl py-2.5 hover:opacity-90 active:scale-[0.98] transition disabled:opacity-60"
                >
                  Create account
                </button>
              </div>
            </form>
          )}
        </div>
      </FormProvider>
    </div>
  );
}
