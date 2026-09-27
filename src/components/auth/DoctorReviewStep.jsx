import {
  CheckCircle2,
  LockKeyhole,
  Pencil,
} from "lucide-react";

import {
  useFormContext,
  useWatch,
} from "react-hook-form";

function ReviewRow({ label, value }) {
  return (
    <div
      className="
        flex items-start justify-between gap-4
        border-b border-[#EEF4F6]
        py-2.5 last:border-0
      "
    >
      <dt className="text-sm text-[#54708A]">
        {label}
      </dt>

      <dd
        className="
          max-w-[60%]
          text-right text-sm font-semibold
          text-[#10273F]
        "
      >
        {value || "Not provided"}
      </dd>
    </div>
  );
}

export default function DoctorReviewStep({
  onEditAccount,
  onEditProfessional,
}) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const values = useWatch({ control });

  const completeName = [
    values.firstName,
    values.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const qualifications = [
    values.primaryQualification,
    values.additionalQualification,
  ]
    .filter(Boolean)
    .join(", ");

  const experience =
    values.yearsOfExperience !== ""
      ? `${values.yearsOfExperience} years`
      : "";

  const consultationFee =
    values.consultationFee !== ""
      ? `₹${values.consultationFee}`
      : "";

  return (
    <div className="space-y-4">
      {/* Account information */}
      <section
        className="
          rounded-2xl
          border border-[#DCEDEF]
          bg-[#FAFDFD]
          p-4
        "
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-bold text-[#10273F]">
            Account information
          </h3>

          <button
            type="button"
            onClick={onEditAccount}
            className="
              inline-flex items-center gap-1
              text-sm font-semibold
              text-[#0B8E85]
              hover:underline
            "
          >
            <Pencil
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            Edit
          </button>
        </div>

        <dl>
          <ReviewRow
            label="Name"
            value={completeName}
          />

          <ReviewRow
            label="Email"
            value={values.email}
          />

          <ReviewRow
            label="Phone"
            value={values.phoneNumber}
          />
        </dl>
      </section>

      {/* Professional information */}
      <section
        className="
          rounded-2xl
          border border-[#DCEDEF]
          bg-[#FAFDFD]
          p-4
        "
      >
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-bold text-[#10273F]">
            Professional information
          </h3>

          <button
            type="button"
            onClick={onEditProfessional}
            className="
              inline-flex items-center gap-1
              text-sm font-semibold
              text-[#0B8E85]
              hover:underline
            "
          >
            <Pencil
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
            Edit
          </button>
        </div>

        <dl>
          <ReviewRow
            label="Registration"
            value={
              values.medicalRegistrationNumber
            }
          />

          <ReviewRow
            label="Medical council"
            value={values.medicalCouncil}
          />

          <ReviewRow
            label="Qualification"
            value={qualifications}
          />

          <ReviewRow
            label="Specialization"
            value={values.specialization}
          />

          <ReviewRow
            label="Hospital / clinic"
            value={values.placeOfWork}
          />

          <ReviewRow
            label="City"
            value={values.city}
          />

          <ReviewRow
            label="Experience"
            value={experience}
          />

          <ReviewRow
            label="Consultation fee"
            value={consultationFee}
          />
        </dl>
      </section>

      {/* Confirmation */}
      <label
        className={`
          flex cursor-pointer
          items-start gap-3
          rounded-xl border p-4
          ${
            errors.doctorConfirmation
              ? "border-red-300 bg-red-50"
              : "border-[#CFE8E8] bg-[#F0FAF9]"
          }
        `}
      >
        <input
          type="checkbox"
          className="
            mt-1 h-4 w-4
            accent-[#0EA394]
          "
          {...register(
            "doctorConfirmation",
            {
              required:
                "Confirm that your professional information is accurate",
            },
          )}
        />

        <span>
          <span
            className="
              flex items-center gap-2
              text-sm font-semibold
              text-[#10273F]
            "
          >
            <CheckCircle2
              className="h-4 w-4 text-[#0EA394]"
              aria-hidden="true"
            />

            I confirm these details are
            accurate
          </span>

          <span
            className="
              mt-1 block
              text-xs leading-5
              text-[#54708A]
            "
          >
            Your doctor account will remain
            pending until NexCare verifies the
            submitted professional information.
          </span>
        </span>
      </label>

      {errors.doctorConfirmation && (
        <p
          className="text-xs text-red-600"
          role="alert"
        >
          {
            errors.doctorConfirmation
              .message
          }
        </p>
      )}

      <p
        className="
          flex items-center justify-center
          gap-2 text-center
          text-xs text-[#6D84A0]
        "
      >
        <LockKeyhole
          className="h-3.5 w-3.5"
          aria-hidden="true"
        />

        Your information is used only for
        verification and account setup.
      </p>
    </div>
  );
}