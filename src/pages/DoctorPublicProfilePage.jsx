import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import {
    Link,
    useLocation,
    useParams,
} from "react-router-dom"
import {
    ArrowLeft,
    BadgeCheck,
    BriefcaseMedical,
    Building2,
    GraduationCap,
    IndianRupee,
    MapPin,
    RefreshCw,
    Star,
    Stethoscope,
} from "lucide-react"
import HomeNavbar from "../components/home/HomeNavbar"
import BookingPanel from "../components/doctors/BookingPanel"
import LoginRequiredModal from "../components/doctors/LoginRequiredModal"
import {
    getDoctorAvailability,
    getDoctorDetails,
    getDoctorReviews,
} from "../api/doctorApi"
import { bookAppointment } from "../api/appointmentApi"
import { useAuth } from "../context/AuthContext"

function getErrorMessage(error) {
    return (
        error?.response?.data?.message
        || error?.message
        || "Something went wrong. Please try again."
    )
}

function formatFee(fee) {
    if (
        fee === null
        || fee === undefined
        || Number.isNaN(Number(fee))
    ) {
        return "Not specified"
    }

    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(Number(fee))
}

function DoctorPortrait({ doctor }) {
    const [imageFailed, setImageFailed] =
        useState(false)

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
                    flex h-full w-full items-center
                    justify-center
                    bg-gradient-to-br
                    from-nexcare-tealLight to-cyan-100
                    text-4xl font-bold
                    text-nexcare-tealDark
                "
            >
                {initials || "DR"}
            </div>
        )
    }

    return (
        <img
            src={doctor.profileImageUrl}
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
        />
    )
}

function LoadingState() {
    return (
        <div
            className="
                mx-auto max-w-screen-2xl animate-pulse
                px-5 py-10 sm:px-8 lg:px-16
            "
        >
            <div className="h-5 w-36 rounded bg-slate-200" />

            <div
                className="
                    mt-6 grid gap-6
                    lg:grid-cols-[minmax(0,1fr)_420px]
                "
            >
                <div className="space-y-5">
                    <div className="h-72 rounded-2xl bg-white" />
                    <div className="h-52 rounded-2xl bg-white" />
                    <div className="h-60 rounded-2xl bg-white" />
                </div>

                <div className="h-[620px] rounded-2xl bg-white" />
            </div>
        </div>
    )
}

export default function DoctorPublicProfilePage() {
    const { doctorId } = useParams()
    const location = useLocation()
    const { isAuthenticated, role } = useAuth()

    const bookingSectionRef = useRef(null)

    const [doctor, setDoctor] = useState(null)
    const [availability, setAvailability] =
        useState([])

    const [reviews, setReviews] = useState([])
    const [selectedSlot, setSelectedSlot] =
        useState(null)

    const [reasonForVisit, setReasonForVisit] =
        useState("")

    const [isLoading, setIsLoading] =
        useState(true)

    const [pageError, setPageError] =
        useState(null)

    const [bookingError, setBookingError] =
        useState(null)

    const [bookingResult, setBookingResult] =
        useState(null)

    const [isBooking, setIsBooking] =
        useState(false)

    const [
        showLoginRequired,
        setShowLoginRequired,
    ] = useState(false)

    const [reloadKey, setReloadKey] =
        useState(0)

    useEffect(() => {
        const controller = new AbortController()

        async function loadPage() {
            try {
                const [
                    doctorData,
                    availabilityData,
                    reviewData,
                ] = await Promise.all([
                    getDoctorDetails(
                        doctorId,
                        {
                            signal:
                                controller.signal,
                        },
                    ),

                    getDoctorAvailability(
                        doctorId,
                        {
                            days: 21,
                            signal:
                                controller.signal,
                        },
                    ),

                    getDoctorReviews(
                        doctorId,
                        {
                            page: 0,
                            size: 4,
                            signal:
                                controller.signal,
                        },
                    ),
                ])

                setDoctor(doctorData)
                setAvailability(
                    availabilityData ?? [],
                )

                setReviews(
                    reviewData?.content ?? [],
                )

                const firstAvailableSlot =
                    availabilityData?.find(
                        (slot) =>
                            !slot.fullyBooked,
                    ) ?? null

                setSelectedSlot(
                    firstAvailableSlot,
                )

                setPageError(null)
            } catch (error) {
                if (
                    error?.code !== "ERR_CANCELED"
                ) {
                    setPageError(
                        getErrorMessage(error),
                    )
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        void loadPage()

        return () => controller.abort()
    }, [doctorId, reloadKey])

    useEffect(() => {
        const shouldOpenBooking =
            new URLSearchParams(
                location.search,
            ).get("booking") === "true"

        if (
            shouldOpenBooking
            && doctor
            && bookingSectionRef.current
        ) {
            bookingSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }, [doctor, location.search])

    const closeLoginModal = useCallback(() => {
        setShowLoginRequired(false)
    }, [])

    async function handleBookAppointment() {
        setBookingError(null)

        if (!selectedSlot) {
            setBookingError(
                "Please select an available session.",
            )
            return
        }

        if (!isAuthenticated) {
            setShowLoginRequired(true)
            return
        }

        const normalizedRole =
            role?.replace("ROLE_", "")

        if (normalizedRole !== "PATIENT") {
            setBookingError(
                "Only patient accounts can book appointments.",
            )
            return
        }

        setIsBooking(true)

        try {
            const result =
                await bookAppointment({
                    doctorAvailabilityId:
                        selectedSlot
                            .doctorAvailabilityId,

                    appointmentDate:
                        selectedSlot
                            .appointmentDate,

                    reasonForVisit,
                })

            setBookingResult(result)
        } catch (error) {
            setBookingError(
                getErrorMessage(error),
            )
        } finally {
            setIsBooking(false)
        }
    }

    function retryPage() {
        setIsLoading(true)
        setPageError(null)
        setReloadKey((value) => value + 1)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-nexcare-canvas">
                <HomeNavbar />
                <LoadingState />
            </div>
        )
    }

    if (pageError || !doctor) {
        return (
            <div className="min-h-screen bg-nexcare-canvas">
                <HomeNavbar />

                <main
                    className="
                        mx-auto max-w-xl px-5 py-20
                        text-center
                    "
                >
                    <Stethoscope
                        className="
                            mx-auto h-12 w-12
                            text-nexcare-teal
                        "
                        aria-hidden="true"
                    />

                    <h1
                        className="
                            mt-5 font-heading text-2xl
                            font-bold text-nexcare-navy
                        "
                    >
                        Doctor profile unavailable
                    </h1>

                    <p
                        className="
                            mt-3 text-sm leading-6
                            text-nexcare-textSecondary
                        "
                    >
                        {pageError
                            || "We could not find this doctor."}
                    </p>

                    <div
                        className="
                            mt-7 flex justify-center gap-3
                        "
                    >
                        <Link
                            to="/doctors"
                            className="
                                inline-flex min-h-11
                                items-center justify-center
                                rounded-xl border
                                border-nexcare-border
                                bg-white px-5 text-sm
                                font-semibold
                                text-nexcare-navy
                            "
                        >
                            Back to Doctors
                        </Link>

                        <button
                            type="button"
                            onClick={retryPage}
                            className="
                                inline-flex min-h-11
                                items-center justify-center
                                gap-2 rounded-xl
                                bg-nexcare-teal px-5
                                text-sm font-semibold
                                text-white
                            "
                        >
                            <RefreshCw
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Retry
                        </button>
                    </div>
                </main>
            </div>
        )
    }

    const qualification = [
        doctor.primaryQualification,
        doctor.additionalQualification,
    ]
        .filter(Boolean)
        .join(", ")

    return (
        <div className="min-h-screen bg-nexcare-canvas">
            <HomeNavbar />

            <main
                className="
                    mx-auto max-w-screen-2xl
                    px-5 pb-16 pt-6
                    sm:px-8 lg:px-16
                "
            >
                <Link
                    to="/doctors"
                    className="
                        inline-flex items-center gap-2
                        text-sm font-semibold
                        text-nexcare-tealDark
                        transition hover:text-nexcare-teal
                    "
                >
                    <ArrowLeft
                        className="h-4 w-4"
                        aria-hidden="true"
                    />
                    Back to doctors
                </Link>

                <div
                    className="
                        mt-5 grid gap-6
                        lg:grid-cols-[minmax(0,1fr)_420px]
                        lg:items-start
                    "
                >
                    <div className="min-w-0 space-y-5">
                        <section
                            className="
                                rounded-2xl border
                                border-nexcare-border
                                bg-white p-5
                                shadow-[0_12px_40px_rgba(16,39,63,0.06)]
                                sm:p-6
                            "
                        >
                            <div
                                className="
                                    grid gap-5
                                    sm:grid-cols-[180px_1fr]
                                "
                            >
                                <div
                                    className="
                                        h-56 overflow-hidden
                                        rounded-2xl
                                        bg-nexcare-tealLight
                                        sm:h-52
                                    "
                                >
                                    <DoctorPortrait
                                        doctor={doctor}
                                    />
                                </div>

                                <div className="min-w-0">
                                    <div
                                        className="
                                            flex flex-wrap
                                            items-center gap-2
                                        "
                                    >
                                        <h1
                                            className="
                                                font-heading
                                                text-3xl font-bold
                                                text-nexcare-navy
                                            "
                                        >
                                            Dr.{" "}
                                            {doctor.firstName}{" "}
                                            {doctor.lastName}
                                        </h1>

                                        <span
                                            className="
                                                inline-flex
                                                items-center gap-1
                                                rounded-full
                                                bg-emerald-50
                                                px-2.5 py-1
                                                text-xs font-semibold
                                                text-emerald-700
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
                                            mt-2 text-lg
                                            font-semibold
                                            text-nexcare-tealDark
                                        "
                                    >
                                        {doctor.specialization}
                                    </p>

                                    <p
                                        className="
                                            mt-2 text-sm
                                            text-nexcare-textSecondary
                                        "
                                    >
                                        {qualification}
                                    </p>

                                    <div
                                        className="
                                            mt-5 grid gap-3
                                            sm:grid-cols-2
                                        "
                                    >
                                        <span
                                            className="
                                                inline-flex
                                                items-center gap-2
                                                text-sm
                                                text-nexcare-textSecondary
                                            "
                                        >
                                            <BriefcaseMedical
                                                className="
                                                    h-4 w-4
                                                    text-nexcare-teal
                                                "
                                                aria-hidden="true"
                                            />
                                            {doctor.yearsOfExperience
                                                ?? 0}
                                            + years experience
                                        </span>

                                        <span
                                            className="
                                                inline-flex
                                                items-center gap-2
                                                text-sm
                                                text-nexcare-textSecondary
                                            "
                                        >
                                            <Building2
                                                className="
                                                    h-4 w-4
                                                    text-nexcare-teal
                                                "
                                                aria-hidden="true"
                                            />
                                            {doctor.placeOfWork
                                                || "Not specified"}
                                        </span>

                                        <span
                                            className="
                                                inline-flex
                                                items-center gap-2
                                                text-sm
                                                text-nexcare-textSecondary
                                            "
                                        >
                                            <MapPin
                                                className="
                                                    h-4 w-4
                                                    text-nexcare-teal
                                                "
                                                aria-hidden="true"
                                            />
                                            {doctor.city
                                                || "Not specified"}
                                        </span>

                                        <span
                                            className="
                                                inline-flex
                                                items-center gap-2
                                                text-sm font-semibold
                                                text-nexcare-navy
                                            "
                                        >
                                            <Star
                                                className="
                                                    h-4 w-4
                                                    fill-amber-400
                                                    text-amber-400
                                                "
                                                aria-hidden="true"
                                            />
                                            {Number(
                                                doctor.averageRating
                                                ?? 0,
                                            ).toFixed(1)}
                                            <span
                                                className="
                                                    font-normal
                                                    text-nexcare-textSecondary
                                                "
                                            >
                                                (
                                                {doctor.reviewCount
                                                    ?? 0}{" "}
                                                reviews)
                                            </span>
                                        </span>
                                    </div>

                                    <div
                                        className="
                                            mt-5 inline-flex
                                            items-center gap-2
                                            rounded-xl
                                            bg-nexcare-tealLight
                                            px-4 py-3
                                        "
                                    >
                                        <IndianRupee
                                            className="
                                                h-5 w-5
                                                text-nexcare-teal
                                            "
                                            aria-hidden="true"
                                        />

                                        <div>
                                            <p
                                                className="
                                                    text-lg font-bold
                                                    text-nexcare-navy
                                                "
                                            >
                                                {formatFee(
                                                    doctor.consultationFee,
                                                )}
                                            </p>

                                            <p
                                                className="
                                                    text-xs
                                                    text-nexcare-textSecondary
                                                "
                                            >
                                                Consultation fee
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className="
                                rounded-2xl border
                                border-nexcare-border
                                bg-white p-5
                                shadow-[0_12px_40px_rgba(16,39,63,0.05)]
                                sm:p-6
                            "
                        >
                            <h2
                                className="
                                    font-heading text-xl
                                    font-bold text-nexcare-navy
                                "
                            >
                                About the doctor
                            </h2>

                            <p
                                className="
                                    mt-3 whitespace-pre-line
                                    text-sm leading-7
                                    text-nexcare-textSecondary
                                "
                            >
                                {doctor.bio
                                    || `Dr. ${doctor.firstName} ${doctor.lastName} is a verified ${doctor.specialization || "healthcare professional"} committed to providing thoughtful and patient-focused care.`}
                            </p>
                        </section>

                        <section
                            className="
                                rounded-2xl border
                                border-nexcare-border
                                bg-white p-5
                                shadow-[0_12px_40px_rgba(16,39,63,0.05)]
                                sm:p-6
                            "
                        >
                            <h2
                                className="
                                    font-heading text-xl
                                    font-bold text-nexcare-navy
                                "
                            >
                                Qualifications & experience
                            </h2>

                            <div
                                className="
                                    mt-5 grid gap-4 sm:grid-cols-2
                                "
                            >
                                <div
                                    className="
                                        rounded-xl
                                        bg-nexcare-surfaceSoft
                                        p-4
                                    "
                                >
                                    <GraduationCap
                                        className="
                                            h-6 w-6
                                            text-nexcare-teal
                                        "
                                        aria-hidden="true"
                                    />

                                    <p
                                        className="
                                            mt-3 font-semibold
                                            text-nexcare-navy
                                        "
                                    >
                                        {doctor.primaryQualification}
                                    </p>

                                    {doctor.additionalQualification && (
                                        <p
                                            className="
                                                mt-1 text-sm
                                                text-nexcare-textSecondary
                                            "
                                        >
                                            {doctor.additionalQualification}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className="
                                        rounded-xl
                                        bg-nexcare-surfaceSoft
                                        p-4
                                    "
                                >
                                    <BriefcaseMedical
                                        className="
                                            h-6 w-6
                                            text-nexcare-teal
                                        "
                                        aria-hidden="true"
                                    />

                                    <p
                                        className="
                                            mt-3 font-semibold
                                            text-nexcare-navy
                                        "
                                    >
                                        {doctor.yearsOfExperience
                                            ?? 0}
                                        + years experience
                                    </p>

                                    <p
                                        className="
                                            mt-1 text-sm
                                            text-nexcare-textSecondary
                                        "
                                    >
                                        Practicing at{" "}
                                        {doctor.placeOfWork
                                            || "an established healthcare facility"}
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section
                            className="
                                rounded-2xl border
                                border-nexcare-border
                                bg-white p-5
                                shadow-[0_12px_40px_rgba(16,39,63,0.05)]
                                sm:p-6
                            "
                        >
                            <div
                                className="
                                    flex items-center
                                    justify-between gap-4
                                "
                            >
                                <div>
                                    <h2
                                        className="
                                            font-heading
                                            text-xl font-bold
                                            text-nexcare-navy
                                        "
                                    >
                                        Patient reviews
                                    </h2>

                                    <p
                                        className="
                                            mt-1 text-sm
                                            text-nexcare-textSecondary
                                        "
                                    >
                                        Reviews from verified
                                        completed appointments
                                    </p>
                                </div>

                                <span
                                    className="
                                        inline-flex
                                        items-center gap-1
                                        font-semibold
                                        text-nexcare-navy
                                    "
                                >
                                    <Star
                                        className="
                                            h-5 w-5
                                            fill-amber-400
                                            text-amber-400
                                        "
                                        aria-hidden="true"
                                    />
                                    {Number(
                                        doctor.averageRating
                                        ?? 0,
                                    ).toFixed(1)}
                                </span>
                            </div>

                            {reviews.length === 0 ? (
                                <p
                                    className="
                                        mt-6 rounded-xl
                                        bg-nexcare-surfaceSoft
                                        px-4 py-5 text-sm
                                        text-nexcare-textSecondary
                                    "
                                >
                                    No patient reviews have been
                                    submitted yet.
                                </p>
                            ) : (
                                <div
                                    className="
                                        mt-5 grid gap-4
                                        md:grid-cols-2
                                    "
                                >
                                    {reviews.map((review) => (
                                        <article
                                            key={review.reviewId}
                                            className="
                                                rounded-xl border
                                                border-nexcare-border
                                                p-4
                                            "
                                        >
                                            <div
                                                className="
                                                    flex items-center
                                                    justify-between
                                                    gap-3
                                                "
                                            >
                                                <p
                                                    className="
                                                        font-semibold
                                                        text-nexcare-navy
                                                    "
                                                >
                                                    {review.patientName}
                                                </p>

                                                <span
                                                    className="
                                                        flex items-center
                                                        gap-1 text-sm
                                                        font-semibold
                                                        text-nexcare-navy
                                                    "
                                                >
                                                    <Star
                                                        className="
                                                            h-4 w-4
                                                            fill-amber-400
                                                            text-amber-400
                                                        "
                                                        aria-hidden="true"
                                                    />
                                                    {review.rating}
                                                </span>
                                            </div>

                                            {review.comment && (
                                                <p
                                                    className="
                                                        mt-3 text-sm
                                                        leading-6
                                                        text-nexcare-textSecondary
                                                    "
                                                >
                                                    {review.comment}
                                                </p>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    <div ref={bookingSectionRef}>
                        <BookingPanel
                            availability={availability}
                            selectedSlot={selectedSlot}
                            reasonForVisit={
                                reasonForVisit
                            }
                            onReasonChange={
                                setReasonForVisit
                            }
                            onSlotChange={
                                setSelectedSlot
                            }
                            onBook={
                                handleBookAppointment
                            }
                            isBooking={isBooking}
                            bookingError={bookingError}
                            bookingResult={bookingResult}
                        />
                    </div>
                </div>
            </main>

            <LoginRequiredModal
                isOpen={showLoginRequired}
                onClose={closeLoginModal}
            />
        </div>
    )
}