import { useState } from "react"
import { Link } from "react-router-dom"
import {
    CalendarDays,
    BadgeCheck,
    BriefcaseMedical,
    Building2,
    IndianRupee,
    MapPin,
    Star,
} from "lucide-react"

function formatConsultationFee(fee) {
    if (
        fee === null ||
        fee === undefined ||
        Number.isNaN(Number(fee))
    ) {
        return "Not specified"
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(fee))
}

function buildQualification(doctor) {
    return [
        doctor.primaryQualification,
        doctor.additionalQualification,
    ]
        .filter(Boolean)
        .join(", ")
}

function DoctorImage({ doctor }) {
    const [imageFailed, setImageFailed] =
        useState(false)

    const fullName = [
        doctor.firstName,
        doctor.lastName,
    ]
        .filter(Boolean)
        .join(" ")

    const initials = [
        doctor.firstName?.[0],
        doctor.lastName?.[0],
    ]
        .filter(Boolean)
        .join("")
        .toUpperCase()

    if (!doctor.profileImageUrl || imageFailed) {
        return (
            <div
                className="
                    flex h-full w-full items-center justify-center
                    bg-gradient-to-br from-[#DDF7F4] to-[#CDEFF3]
                    text-3xl font-bold text-nexcare-tealDark
                "
                aria-label={`${fullName} profile placeholder`}
            >
                {initials || "DR"}
            </div>
        )
    }

    return (
        <img
            src={doctor.profileImageUrl}
            alt={`Dr. ${fullName}`}
            className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-[1.03]
            "
            onError={() => setImageFailed(true)}
        />
    )
}

export default function DoctorCard({ doctor }) {
    const fullName = [
        doctor.firstName,
        doctor.lastName,
    ]
        .filter(Boolean)
        .join(" ")

    const qualification =
        buildQualification(doctor)

    const yearsOfExperience =
        doctor.yearsOfExperience ?? 0

    const rating =
        Number(doctor.averageRating ?? 0)

    const reviewCount =
        doctor.reviewCount ?? 0

    return (
        <article
            className="
                group overflow-hidden rounded-2xl border
                border-nexcare-border bg-white p-3
                shadow-[0_10px_35px_rgba(16,39,63,0.05)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-nexcare-teal/40
                hover:shadow-[0_16px_45px_rgba(14,163,148,0.12)]
                sm:p-4
            "
        >
            <div
                className="
                    grid gap-5
                    lg:grid-cols-[150px_minmax(0,1.45fr)_minmax(330px,1fr)_auto]
                    lg:items-center
                "
            >
                <div
                    className="
                        h-52 overflow-hidden rounded-xl
                        bg-nexcare-tealLight
                        sm:h-56
                        lg:h-32 lg:w-[150px]
                    "
                >
                    <DoctorImage doctor={doctor} />
                </div>

                <div className="min-w-0">
                    <div
                        className="
                            flex flex-wrap items-center gap-2
                        "
                    >
                        <Link
    to={`/doctors/${doctor.doctorId}`}
    className="
        font-heading text-xl font-bold
        text-nexcare-navy transition
        hover:text-nexcare-teal
        focus-visible:outline-none
        focus-visible:underline
        sm:text-2xl
    "
>
    Dr. {fullName}
</Link>
                        <span
                            className="
                                inline-flex items-center gap-1
                                rounded-full bg-emerald-50 px-2.5 py-1
                                text-xs font-semibold text-emerald-700
                            "
                        >
                            <BadgeCheck
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Verified
                        </span>
                    </div>

                    <p
                        className="
                            mt-2 inline-flex rounded-full
                            bg-blue-50 px-3 py-1
                            text-sm font-semibold text-blue-700
                        "
                    >
                        {doctor.specialization
                            || "General Physician"}
                    </p>

                    {qualification && (
                        <p
                            className="
                                mt-3 line-clamp-2 text-sm
                                leading-6 text-nexcare-textSecondary
                            "
                            title={qualification}
                        >
                            {qualification}
                        </p>
                    )}

                    <div
                        className="
                            mt-3 flex flex-wrap gap-x-5 gap-y-2
                            text-sm text-nexcare-textSecondary
                        "
                    >
                        {doctor.placeOfWork && (
                            <span
                                className="
                                    inline-flex items-center gap-1.5
                                "
                            >
                                <Building2
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                                {doctor.placeOfWork}
                            </span>
                        )}

                        {doctor.city && (
                            <span
                                className="
                                    inline-flex items-center gap-1.5
                                "
                            >
                                <MapPin
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                                {doctor.city}
                            </span>
                        )}
                    </div>
                </div>

                <div
                    className="
                        grid grid-cols-2 gap-3
                        border-y border-nexcare-border py-4
                        sm:grid-cols-3
                        lg:border-y-0 lg:border-l lg:py-0 lg:pl-6
                    "
                >
                    <div>
                        <BriefcaseMedical
                            className="
                                mb-2 h-5 w-5 text-nexcare-teal
                            "
                            aria-hidden="true"
                        />

                        <p
                            className="
                                font-bold text-nexcare-navy
                            "
                        >
                            {yearsOfExperience}+ years
                        </p>

                        <p
                            className="
                                mt-1 text-xs
                                text-nexcare-textSecondary
                            "
                        >
                            Experience
                        </p>
                    </div>

                    <div>
                        <Star
                            className="
                                mb-2 h-5 w-5 fill-amber-400
                                text-amber-400
                            "
                            aria-hidden="true"
                        />

                        <p
                            className="
                                font-bold text-nexcare-navy
                            "
                        >
                            {rating.toFixed(1)}
                        </p>

                        <p
                            className="
                                mt-1 text-xs
                                text-nexcare-textSecondary
                            "
                        >
                            {reviewCount}{" "}
                            {reviewCount === 1
                                ? "review"
                                : "reviews"}
                        </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <IndianRupee
                            className="
                                mb-2 h-5 w-5 text-nexcare-teal
                            "
                            aria-hidden="true"
                        />

                        <p
                            className="
                                font-bold text-nexcare-navy
                            "
                        >
                            {formatConsultationFee(
                                doctor.consultationFee,
                            )}
                        </p>

                        <p
                            className="
                                mt-1 text-xs
                                text-nexcare-textSecondary
                            "
                        >
                            Consultation fee
                        </p>
                    </div>
                </div>

                <div className="lg:min-w-[190px]">
    <Link
        to={`/doctors/${doctor.doctorId}?booking=true`}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-nexcare-teal px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-nexcare-tealDark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-nexcare-teal focus:ring-offset-2"
    >
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        View Availability
    </Link>
</div>
            </div>
        </article>
    )
}