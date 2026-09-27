import {
  CheckCircle2,
  LockKeyhole,
  Pencil,
} from "lucide-react";

import {
  useFormContext,
  useWatch,
} from "react-hook-form";

const GENDER_LABELS = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",

  PREFER_NOT_TO_SAY:
    "Prefer not to say",
};

const BLOOD_GROUP_LABELS = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",

  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",

  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",

  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

function ReviewRow({
  label,
  value,
}) {
  const displayValue =
    value === "" ||
    value === null ||
    value === undefined
      ? "Not provided"
      : value;

  return (
    <div className="grid grid-cols-[minmax(100px,0.8fr)_minmax(0,1.4fr)] gap-3 border-b border-[#EDF3F5] py-1.5 last:border-0">
      <dt className="text-sm text-[#6D84A0]">
        {label}
      </dt>

      <dd className="break-words text-sm font-semibold text-[#10273F]">
        {displayValue}
      </dd>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}) {
  return (
    <section className="rounded-2xl border border-[#D8E8EB] bg-white p-4">
      <div className="mb-1 flex items-center justify-between gap-4">
        <h3 className="font-bold text-[#10273F]">
          {title}
        </h3>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-[#0B8F86] transition hover:bg-[#ECF9F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA394]"
        >
          <Pencil
            className="h-3.5 w-3.5"
            aria-hidden="true"
          />

          Edit
        </button>
      </div>

      <dl>
        {children}
      </dl>
    </section>
  );
}

export default function SignupReviewStep({
  onEditAccount,
  onEditProfile,
  onEditPractice,
}) {
  const {
    control,
    register,

    formState: {
      errors,
    },
  } = useFormContext();

  const values = useWatch({
    control,
  });

  const isDoctor =
    values.role === "DOCTOR";

  return (
    <div className="space-y-3">
      {/* 
        Patient: 2 columns on tablet/desktop.
        Doctor: 2 columns on medium screens and
        3 columns on larger desktop screens.
      */}
      <div
        className={`grid gap-3 items-start ${
          isDoctor
            ? "md:grid-cols-2 xl:grid-cols-3"
            : "md:grid-cols-2"
        }`}
      >
        {/* Account information */}
        <ReviewSection
          title="Account information"
          onEdit={onEditAccount}
        >
          <ReviewRow
            label="Full name"
            value={`${values.firstName || ""} ${
              values.lastName || ""
            }`.trim()}
          />

          <ReviewRow
            label="Email address"
            value={values.email}
          />

          <ReviewRow
            label="Phone number"
            value={values.phoneNumber}
          />

          <ReviewRow
            label="Account type"
            value={
              isDoctor
                ? "Doctor"
                : "Patient"
            }
          />
        </ReviewSection>

        {/* Doctor professional information */}
        {isDoctor ? (
          <ReviewSection
            title="Professional information"
            onEdit={onEditProfile}
          >
            <ReviewRow
              label="Registration number"
              value={
                values.medicalRegistrationNumber
              }
            />

            <ReviewRow
              label="Medical council"
              value={values.medicalCouncil}
            />

            <ReviewRow
              label="Registration date"
              value={
                values.registrationDate
              }
            />

            <ReviewRow
              label="Qualification"
              value={[
                values.primaryQualification,
                values.additionalQualification,
              ]
                .filter(Boolean)
                .join(", ")}
            />

            <ReviewRow
              label="Specialization"
              value={values.specialization}
            />

            <ReviewRow
              label="Year of passing"
              value={values.yearOfPassing}
            />

            <ReviewRow
              label="Experience"
              value={
                values.yearsOfExperience !== ""
                  ? `${values.yearsOfExperience} years`
                  : ""
              }
            />
          </ReviewSection>
        ) : (
          /* Patient health profile */
          <ReviewSection
            title="Health profile"
            onEdit={onEditProfile}
          >
            <ReviewRow
              label="Gender"
              value={
                GENDER_LABELS[
                  values.gender
                ]
              }
            />

            <ReviewRow
              label="Date of birth"
              value={values.dateOfBirth}
            />

            <ReviewRow
              label="Blood group"
              value={
                BLOOD_GROUP_LABELS[
                  values.bloodGroup
                ]
              }
            />

            <ReviewRow
              label="Height"
              value={
                values.height
                  ? `${values.height} cm`
                  : ""
              }
            />

            <ReviewRow
              label="Weight"
              value={
                values.weight
                  ? `${values.weight} kg`
                  : ""
              }
            />

            <ReviewRow
              label="Emergency contact"
              value={
                values.emergencyContact
              }
            />

            <ReviewRow
              label="Address"
              value={values.address}
            />
          </ReviewSection>
        )}

        {/* Doctor practice information */}
        {isDoctor && (
          <ReviewSection
            title="Practice information"
            onEdit={onEditPractice}
          >
            <ReviewRow
              label="Place of work"
              value={values.placeOfWork}
            />

            <ReviewRow
              label="City"
              value={values.city}
            />

            <ReviewRow
              label="Consultation fee"
              value={
                values.consultationFee !== ""
                  ? `₹${values.consultationFee}`
                  : ""
              }
            />
          </ReviewSection>
        )}
      </div>

      {/* Confirmation */}
      <div>
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition ${
            errors.reviewConfirmation
              ? "border-red-300 bg-red-50"
              : "border-[#CFE8E8] bg-[#F0FAF9]"
          }`}
        >
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#0EA394]"
            {...register(
              "reviewConfirmation",
              {
                required:
                  "Confirm that the information provided is accurate",
              },
            )}
          />

          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-[#10273F]">
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-[#0EA394]"
                aria-hidden="true"
              />

              I confirm that the information
              provided is accurate.
            </span>

            {isDoctor && (
              <span className="mt-1 block text-xs leading-5 text-[#54708A]">
                Your professional profile will
                remain pending until NexCare
                verifies it.
              </span>
            )}
          </span>
        </label>

        {errors.reviewConfirmation && (
          <p
            className="mt-1 text-xs text-red-600"
            role="alert"
          >
            {
              errors.reviewConfirmation
                .message
            }
          </p>
        )}
      </div>

      {/* Security note */}
      <p className="flex items-center justify-center gap-2 text-center text-xs text-[#6D84A0]">
        <LockKeyhole
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />

        Your password is encrypted by the
        server and is never displayed here.
      </p>
    </div>
  );
}