import { useState } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { signup } from "../../api/authApi";
import { buildSignupPayload } from "../../utils/buildSignupPayload";
import { getSignupErrorMessage } from "../../utils/getSignupErrorMessage";
import DoctorStep2 from "./DoctorStep2";
import PatientStep2 from "./PatientStep2";
import SignupBasicDetailsStep from "./SignupBasicDetailsStep";
import SignupReviewStep from "./SignupReviewStep";
import SignupRoleStep from "./SignupRoleStep";
import SignupStepper from "./SignupStepper";

const STEPS = ["Account type", "Basic details", "Profile", "Review"];

const BASIC_FIELDS = [
  "firstName",
  "lastName",
  "email",
  "phoneNumber",
  "password",
  "confirmPassword",
];

const PATIENT_FIELDS = ["gender", "dateOfBirth", "bloodGroup", "emergencyContact", "height", "weight", "address"];

const DOCTOR_FIELDS = [
  "medicalRegistrationNumber",
  "medicalCouncil",
  "registrationDate",
  "yearOfPassing",
  "primaryQualification",
  "additionalQualification",
  "specialization",
  "yearsOfExperience",
  "placeOfWork",
  "city",
  "consultationFee",
];

const DEFAULT_VALUES = {
  role: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  gender: "",
  dateOfBirth: "",
  bloodGroup: "",
  emergencyContact: "",
  height: "",
  weight: "",
  address: "",
  medicalRegistrationNumber: "",
  medicalCouncil: "",
  registrationDate: "",
  yearOfPassing: "",
  primaryQualification: "",
  additionalQualification: "",
  specialization: "",
  yearsOfExperience: "",
  placeOfWork: "",
  city: "",
  consultationFee: "",
  reviewConfirmation: false,
};

const STEP_COPY = {
  1: {
    title: "How will you use NexCare?",
    description: "Choose the option that best describes you to get started.",
  },
  2: {
    title: "Tell us about yourself",
    description: "Create your account with a few basic details.",
  },
  4: {
    title: "Review your details",
    description: "Check your information before creating your account.",
  },
};

function findServerErrorStep(fieldNames) {
  if (fieldNames.some((name) => BASIC_FIELDS.includes(name))) return 2;
  if (fieldNames.some((name) => PATIENT_FIELDS.includes(name) || DOCTOR_FIELDS.includes(name))) return 3;
  return 4;
}

export default function SignupForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState("");

  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: false,
    defaultValues: DEFAULT_VALUES,
  });

  const { control, trigger, clearErrors, setError, handleSubmit, formState } = methods;
  const selectedRole = useWatch({ control, name: "role" });
  const isDoctor = selectedRole === "DOCTOR";

  const profileTitle = isDoctor ? "Professional details" : "Your health profile";
  const profileDescription = isDoctor
    ? "Tell patients about your registration, expertise and practice."
    : "These details help NexCare personalize your healthcare experience.";

  const copy = currentStep === 3
    ? { title: profileTitle, description: profileDescription }
    : STEP_COPY[currentStep];

  async function moveToNextStep() {
    setSubmitError("");

    if (currentStep === 1) {
      const valid = await trigger("role", { shouldFocus: true });
      if (valid) setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const valid = await trigger(BASIC_FIELDS, { shouldFocus: true });
      if (valid) setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      const fields = isDoctor ? DOCTOR_FIELDS : PATIENT_FIELDS;
      const valid = await trigger(fields, { shouldFocus: true });
      if (valid) setCurrentStep(4);
    }
  }

  function moveBack() {
    setSubmitError("");
    clearErrors("root");
    setCurrentStep((step) => Math.max(1, step - 1));
  }

  async function submitSignup(values) {
    setSubmitError("");

    try {
      const payload = buildSignupPayload(values);
      await signup(payload);

      navigate("/login", {
        replace: true,
        state: {
          email: payload.email,
          signupSuccess: isDoctor
            ? "Your doctor account was created. Sign in to view your verification status."
            : "Your account was created successfully. You can now sign in.",
        },
      });
    } catch (error) {
      const { message, fieldErrors } = getSignupErrorMessage(error);
      const entries = Object.entries(fieldErrors);

      entries.forEach(([fieldName, fieldMessage]) => {
        setError(fieldName, {
          type: "server",
          message: fieldMessage,
        });
      });

      if (error?.response?.status === 409 && entries.length === 0) {
        setError("email", {
          type: "server",
          message: "An account with this email already exists",
        });
        setCurrentStep(2);
      } else if (entries.length > 0) {
        setCurrentStep(findServerErrorStep(entries.map(([fieldName]) => fieldName)));
      }

      setSubmitError(message);
    }
  }

  const isReviewStep = currentStep === 4;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitSignup)} noValidate>
        <section className={`mx-auto rounded-[24px] border border-white/80 bg-white/95 shadow-[0_24px_70px_rgba(16,39,63,0.13)] backdrop-blur-sm ${currentStep === 1 ? "max-w-[760px]" : "max-w-[940px]"}`}>
          <div className="px-5 py-6 sm:px-8 sm:py-7 lg:px-10">
            {currentStep > 1 && (
              <div className="mb-6 border-b border-[#E5EFF1] pb-5">
                <SignupStepper currentStep={currentStep} steps={STEPS} />
              </div>
            )}

            <header className="mx-auto mb-6 max-w-2xl text-center">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0B8F86]">
                {currentStep === 1 ? "Create your account" : `Step ${currentStep} of ${STEPS.length}`}
              </p>
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-[#10273F] sm:text-3xl">
                {copy.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-[#54708A] sm:text-base">
                {copy.description}
              </p>
            </header>

            {submitError && (
              <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            {currentStep === 1 && <SignupRoleStep />}
            {currentStep === 2 && <SignupBasicDetailsStep />}
            {currentStep === 3 && (isDoctor ? <DoctorStep2 /> : <PatientStep2 />)}
            {currentStep === 4 && (
              <SignupReviewStep
                onEditAccount={() => setCurrentStep(2)}
                onEditProfile={() => setCurrentStep(3)}
              />
            )}

            <div className={`mt-6 flex gap-3 ${currentStep === 1 ? "justify-center" : "justify-between"}`}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={moveBack}
                  disabled={formState.isSubmitting}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#BFD5DA] bg-white px-5 text-sm font-semibold text-[#385574] transition hover:border-[#0EA394] hover:bg-[#F0FAF9] hover:text-[#0B8F86] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA394]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back
                </button>
              )}

              {isReviewStep ? (
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="inline-flex min-h-11 min-w-[190px] items-center justify-center gap-2 rounded-xl bg-[#0EA394] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,163,148,0.24)] transition hover:bg-[#0B8F86] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA394]/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formState.isSubmitting ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Creating account...
                    </>
                  ) : (
                    isDoctor ? "Create doctor account" : "Create patient account"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={moveToNextStep}
                  className="inline-flex min-h-11 min-w-[160px] items-center justify-center gap-2 rounded-xl bg-[#0EA394] px-6 text-sm font-bold text-white shadow-[0_10px_24px_rgba(14,163,148,0.22)] transition hover:bg-[#0B8F86] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0EA394]/25"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
}
