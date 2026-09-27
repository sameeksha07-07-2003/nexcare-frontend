import {
    AlertCircle,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    Search,
} from "lucide-react"
import {
    useEffect,
    useMemo,
    useState,
} from "react"
import {
    Link,
    useNavigate,
    useSearchParams,
} from "react-router-dom"

import {
    cancelAppointment,
    getMyAppointments,
    submitDoctorReview,
} from "../api/appointmentApi"

import AppointmentCard from "../components/appointments/AppointmentCard"
import AppointmentDetailsModal from "../components/appointments/AppointmentDetailsModal"
import AppointmentSummary from "../components/appointments/AppointmentSummary"
import CancelAppointmentModal from "../components/appointments/CancelAppointmentModal"
import ReviewModal from "../components/appointments/ReviewModal"

import {
    APPOINTMENT_FILTERS,
    getApiErrorMessage,
    getAppointmentFilter,
    getAppointmentTimestamp,
} from "../utils/appointmentUi"

const PAGE_SIZE = 10

const EMPTY_MESSAGES = {
    BOOKED: {
        title: "No upcoming appointments",
        description:
            "When you book an appointment, it will appear here.",
    },
    COMPLETED: {
        title: "No completed appointments",
        description:
            "Your completed consultations will appear here.",
    },
    CANCELLED: {
        title: "No cancelled appointments",
        description:
            "You do not have any cancelled appointments.",
    },
}

function AppointmentListSkeleton() {
    return (
        <div
            className="space-y-4"
            aria-label="Loading appointments"
        >
            {[1, 2].map((item) => (
                <div
                    key={item}
                    className="h-44 animate-pulse rounded-2xl border border-[#DCEDEF] bg-white"
                >
                    <div className="flex h-full gap-5 p-5">
                        <div className="w-28 rounded-xl bg-[#EAF5F5]" />

                        <div className="flex-1 space-y-3 py-3">
                            <div className="h-5 w-48 rounded bg-[#E7EFF2]" />
                            <div className="h-4 w-32 rounded bg-[#EEF4F5]" />
                            <div className="h-4 w-64 max-w-full rounded bg-[#EEF4F5]" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function MyAppointmentsPage() {
    const navigate = useNavigate()

    const [searchParams, setSearchParams] =
        useSearchParams()

    const requestedFilter =
        searchParams.get("status") || "upcoming"

    const activeFilter =
        getAppointmentFilter(requestedFilter)

    const requestedPage = Number(
        searchParams.get("page") || 0,
    )

    const currentPage =
        Number.isInteger(requestedPage) &&
        requestedPage >= 0
            ? requestedPage
            : 0

    const defaultSortOrder =
        activeFilter.apiStatus === "BOOKED"
            ? "asc"
            : "desc"

    const requestedSortOrder =
        searchParams.get("order")

    const sortOrder =
        requestedSortOrder === "asc" ||
        requestedSortOrder === "desc"
            ? requestedSortOrder
            : defaultSortOrder

    const [appointmentPage, setAppointmentPage] =
        useState(null)

    const [counts, setCounts] = useState({
        BOOKED: 0,
        COMPLETED: 0,
        CANCELLED: 0,
    })

    const [listStatus, setListStatus] =
        useState("loading")

    const [countsLoading, setCountsLoading] =
        useState(true)

    const [listError, setListError] = useState("")

    const [refreshVersion, setRefreshVersion] =
        useState(0)

    const [
        selectedAppointment,
        setSelectedAppointment,
    ] = useState(null)

    const [
        appointmentToCancel,
        setAppointmentToCancel,
    ] = useState(null)

    const [
        appointmentToReview,
        setAppointmentToReview,
    ] = useState(null)

    const [actionStatus, setActionStatus] =
        useState("idle")

    const [actionError, setActionError] = useState("")

    const [successMessage, setSuccessMessage] =
        useState("")

    useEffect(() => {
        const controller = new AbortController()

        getMyAppointments({
            status: activeFilter.apiStatus,
            page: currentPage,
            size: PAGE_SIZE,
            signal: controller.signal,
        })
            .then((response) => {
                setAppointmentPage(response)
                setListStatus("success")
            })
            .catch((error) => {
                if (
                    error?.code === "ERR_CANCELED" ||
                    error?.name === "CanceledError"
                ) {
                    return
                }

                setListError(
                    getApiErrorMessage(
                        error,
                        "We could not load your appointments.",
                    ),
                )

                setListStatus("error")
            })

        return () => {
            controller.abort()
        }
    }, [
        activeFilter.apiStatus,
        currentPage,
        refreshVersion,
    ])

    useEffect(() => {
        const controller = new AbortController()

        Promise.all(
            APPOINTMENT_FILTERS.map((filter) =>
                getMyAppointments({
                    status: filter.apiStatus,
                    page: 0,
                    size: 1,
                    signal: controller.signal,
                }).then((response) => [
                    filter.apiStatus,
                    response.totalElements ?? 0,
                ]),
            ),
        )
            .then((entries) => {
                setCounts(Object.fromEntries(entries))
            })
            .catch((error) => {
                if (
                    error?.code === "ERR_CANCELED" ||
                    error?.name === "CanceledError"
                ) {
                    return
                }

                setCounts({
                    BOOKED: 0,
                    COMPLETED: 0,
                    CANCELLED: 0,
                })
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setCountsLoading(false)
                }
            })

        return () => {
            controller.abort()
        }
    }, [refreshVersion])

    const sortedAppointments = useMemo(() => {
        const appointments = [
            ...(appointmentPage?.content ?? []),
        ]

        appointments.sort((first, second) => {
            const difference =
                getAppointmentTimestamp(first) -
                getAppointmentTimestamp(second)

            return sortOrder === "asc"
                ? difference
                : -difference
        })

        return appointments
    }, [appointmentPage, sortOrder])

    const totalPages =
        appointmentPage?.totalPages ?? 0

    const emptyMessage =
        EMPTY_MESSAGES[activeFilter.apiStatus] ??
        EMPTY_MESSAGES.BOOKED

    function replaceSearchParameters(updates) {
        const nextParameters = new URLSearchParams(
            searchParams,
        )

        Object.entries(updates).forEach(
            ([key, value]) => {
                nextParameters.set(key, String(value))
            },
        )

        setSearchParams(nextParameters)
    }

    function prepareForListRequest() {
        setListStatus("loading")
        setListError("")
        setSuccessMessage("")
    }

    function handleFilterChange(filterKey) {
        const nextFilter =
            getAppointmentFilter(filterKey)

        if (
            nextFilter.key === activeFilter.key &&
            currentPage === 0
        ) {
            return
        }

        prepareForListRequest()

        replaceSearchParameters({
            status: nextFilter.key,
            page: 0,
            order:
                nextFilter.apiStatus === "BOOKED"
                    ? "asc"
                    : "desc",
        })
    }

    function handleSummaryStatusChange(apiStatus) {
        const matchingFilter =
            APPOINTMENT_FILTERS.find(
                (filter) =>
                    filter.apiStatus === apiStatus,
            )

        if (matchingFilter) {
            handleFilterChange(matchingFilter.key)
        }
    }

    function handleSortChange(event) {
        replaceSearchParameters({
            order: event.target.value,
            page: 0,
        })
    }

    function handlePageChange(nextPage) {
        if (
            nextPage < 0 ||
            nextPage >= totalPages ||
            nextPage === currentPage
        ) {
            return
        }

        prepareForListRequest()

        replaceSearchParameters({
            page: nextPage,
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    function refreshAppointments(message = "") {
        setSuccessMessage(message)
        setListStatus("loading")
        setListError("")

        setRefreshVersion(
            (currentVersion) => currentVersion + 1,
        )
    }

    function handleRetry() {
        setListStatus("loading")
        setListError("")

        setRefreshVersion(
            (currentVersion) => currentVersion + 1,
        )
    }

    function openCancellationModal(appointment) {
        setActionError("")
        setActionStatus("idle")
        setAppointmentToCancel(appointment)
    }

    function closeCancellationModal() {
        if (actionStatus === "loading") {
            return
        }

        setAppointmentToCancel(null)
        setActionError("")
        setActionStatus("idle")
    }

    function openReviewModal(appointment) {
        setActionError("")
        setActionStatus("idle")
        setAppointmentToReview(appointment)
    }

    function closeReviewModal() {
        if (actionStatus === "loading") {
            return
        }

        setAppointmentToReview(null)
        setActionError("")
        setActionStatus("idle")
    }

    async function handleConfirmCancellation(reason) {
        if (!appointmentToCancel) {
            return
        }

        try {
            setActionStatus("loading")
            setActionError("")

            await cancelAppointment(
                appointmentToCancel.appointmentId,
                reason,
            )

            setAppointmentToCancel(null)
            setActionStatus("idle")

            refreshAppointments(
                "Your appointment was cancelled successfully.",
            )
        } catch (error) {
            setActionError(
                getApiErrorMessage(
                    error,
                    "We could not cancel the appointment.",
                ),
            )

            setActionStatus("error")
        }
    }

    async function handleSubmitReview(reviewData) {
        if (!appointmentToReview) {
            return
        }

        try {
            setActionStatus("loading")
            setActionError("")

            await submitDoctorReview(
                appointmentToReview.appointmentId,
                reviewData,
            )

            setAppointmentToReview(null)
            setActionStatus("idle")

            refreshAppointments(
                "Thank you. Your review was submitted.",
            )
        } catch (error) {
            setActionError(
                getApiErrorMessage(
                    error,
                    "We could not submit your review.",
                ),
            )

            setActionStatus("error")
        }
    }

    return (
        <div className="min-h-full">
            <div className="mx-auto max-w-screen-2xl">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
                            My Appointments
                        </h1>

                        <p className="mt-2 text-sm text-[#52709B] sm:text-base">
                            View, manage or cancel your
                            healthcare appointments all in
                            one place.
                        </p>
                    </div>

                    <Link
                        to="/doctors"
                        className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-xl bg-[#0EA5A5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B8F90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5A5] focus-visible:ring-offset-2"
                    >
                        <Search
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                        Find a Doctor
                    </Link>
                </header>

                <div className="mt-7">
                    <AppointmentSummary
                        counts={counts}
                        activeStatus={
                            activeFilter.apiStatus
                        }
                        onStatusChange={
                            handleSummaryStatusChange
                        }
                        isLoading={countsLoading}
                    />
                </div>

                {successMessage && (
                    <div
                        role="status"
                        className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-[#B9E5D0] bg-[#F0FBF5] px-4 py-3 text-sm font-medium text-[#176A3A]"
                    >
                        <span>{successMessage}</span>

                        <button
                            type="button"
                            onClick={() =>
                                setSuccessMessage("")
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#DDF5E8]"
                            aria-label="Dismiss success message"
                        >
                            ×
                        </button>
                    </div>
                )}

                <section className="mt-6">
                    <div className="flex flex-col gap-4 rounded-2xl border border-[#DCEDEF] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div
                            className="flex overflow-x-auto"
                            role="tablist"
                            aria-label="Appointment status"
                        >
                            {APPOINTMENT_FILTERS.map(
                                (filter) => {
                                    const isActive =
                                        activeFilter.key ===
                                        filter.key

                                    return (
                                        <button
                                            key={
                                                filter.key
                                            }
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                isActive
                                            }
                                            onClick={() =>
                                                handleFilterChange(
                                                    filter.key,
                                                )
                                            }
                                            className={[
                                                "relative shrink-0 px-5 py-3",
                                                "text-sm font-semibold transition",
                                                isActive
                                                    ? "text-[#079A99]"
                                                    : "text-[#52709B] hover:text-[#079A99]",
                                            ].join(
                                                " ",
                                            )}
                                        >
                                            {filter.label} (
                                            {counts[
                                                filter
                                                    .apiStatus
                                            ] ?? 0}
                                            )

                                            {isActive && (
                                                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#0EA5A5]" />
                                            )}
                                        </button>
                                    )
                                },
                            )}
                        </div>

                        <label className="flex shrink-0 items-center gap-2 rounded-xl border border-[#D3E6EB] px-3 py-2 text-sm font-semibold text-[#385574]">
                            <CalendarDays
                                className="h-4 w-4"
                                aria-hidden="true"
                            />

                            <span className="sr-only">
                                Sort appointments
                            </span>

                            <select
                                value={sortOrder}
                                onChange={handleSortChange}
                                className="cursor-pointer bg-transparent pr-1 outline-none"
                            >
                                <option value="asc">
                                    {activeFilter.apiStatus ===
                                    "BOOKED"
                                        ? "Upcoming First"
                                        : "Oldest First"}
                                </option>

                                <option value="desc">
                                    Latest First
                                </option>
                            </select>
                        </label>
                    </div>

                    <div className="mt-5">
                        {listStatus === "loading" && (
                            <AppointmentListSkeleton />
                        )}

                        {listStatus === "error" && (
                            <div className="rounded-2xl border border-[#F3CCD3] bg-white px-6 py-12 text-center">
                                <AlertCircle
                                    className="mx-auto h-10 w-10 text-[#EA2945]"
                                    aria-hidden="true"
                                />

                                <h2 className="mt-4 text-lg font-bold text-[#071E4A]">
                                    Unable to load
                                    appointments
                                </h2>

                                <p className="mt-2 text-sm text-[#54708A]">
                                    {listError}
                                </p>

                                <button
                                    type="button"
                                    onClick={handleRetry}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0EA5A5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B8F90]"
                                >
                                    <LoaderCircle
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Try Again
                                </button>
                            </div>
                        )}

                        {listStatus === "success" &&
                            sortedAppointments.length ===
                                0 && (
                                <div className="rounded-2xl border border-[#DCEDEF] bg-white px-6 py-14 text-center">
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F8F6]">
                                        <CalendarDays
                                            className="h-8 w-8 text-[#0EA5A5]"
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <h2 className="mt-5 text-xl font-bold text-[#071E4A]">
                                        {
                                            emptyMessage.title
                                        }
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-[#54708A]">
                                        {
                                            emptyMessage.description
                                        }
                                    </p>

                                    {activeFilter.apiStatus ===
                                        "BOOKED" && (
                                        <Link
                                            to="/doctors"
                                            className="mt-6 inline-flex rounded-xl bg-[#0EA5A5] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0B8F90]"
                                        >
                                            Find a Doctor
                                        </Link>
                                    )}
                                </div>
                            )}

                        {listStatus === "success" &&
                            sortedAppointments.length >
                                0 && (
                                <div className="space-y-4">
                                    {sortedAppointments.map(
                                        (
                                            appointment,
                                        ) => (
                                            <AppointmentCard
                                                key={
                                                    appointment.appointmentId
                                                }
                                                appointment={
                                                    appointment
                                                }
                                                onViewDetails={
                                                    setSelectedAppointment
                                                }
                                                onCancel={
                                                    openCancellationModal
                                                }
                                                onReview={
                                                    openReviewModal
                                                }
                                                onBookAgain={(
                                                    doctorId,
                                                ) =>
                                                    navigate(
                                                        `/doctors/${doctorId}`,
                                                    )
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            )}
                    </div>

                    {listStatus === "success" &&
                        totalPages > 1 && (
                            <nav
                                aria-label="Appointment pagination"
                                className="mt-7 flex flex-wrap items-center justify-center gap-2"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage - 1,
                                        )
                                    }
                                    disabled={
                                        appointmentPage?.first
                                    }
                                    className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#D3E6EB] bg-white px-4 text-sm font-semibold text-[#385574] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <ChevronLeft
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Previous
                                </button>

                                {Array.from(
                                    {
                                        length: totalPages,
                                    },
                                    (_, index) => index,
                                )
                                    .slice(
                                        Math.max(
                                            0,
                                            currentPage - 2,
                                        ),
                                        Math.min(
                                            totalPages,
                                            currentPage + 3,
                                        ),
                                    )
                                    .map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            type="button"
                                            onClick={() =>
                                                handlePageChange(
                                                    pageNumber,
                                                )
                                            }
                                            aria-current={
                                                pageNumber ===
                                                currentPage
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={[
                                                "h-11 min-w-11 rounded-xl border px-3",
                                                "text-sm font-semibold transition",
                                                pageNumber ===
                                                currentPage
                                                    ? "border-[#0EA5A5] bg-[#0EA5A5] text-white"
                                                    : "border-[#D3E6EB] bg-white text-[#385574] hover:border-[#0EA5A5]",
                                            ].join(
                                                " ",
                                            )}
                                        >
                                            {pageNumber + 1}
                                        </button>
                                    ))}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage + 1,
                                        )
                                    }
                                    disabled={
                                        appointmentPage?.last
                                    }
                                    className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#D3E6EB] bg-white px-4 text-sm font-semibold text-[#385574] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                    <ChevronRight
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </nav>
                        )}
                </section>

                <section className="mt-8 overflow-hidden rounded-2xl border border-[#D8ECEE] bg-gradient-to-r from-white via-[#F0FBFA] to-[#DDF7F5] p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-[#071E4A]">
                                Need another consultation?
                            </h2>

                            <p className="mt-1 text-sm text-[#52709B]">
                                Find verified doctors, check
                                availability and book your
                                next appointment.
                            </p>
                        </div>

                        <Link
                            to="/doctors"
                            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0EA5A5] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0B8F90]"
                        >
                            Find a Doctor
                            <ChevronRight
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </section>
            </div>

            {selectedAppointment && (
                <AppointmentDetailsModal
                    appointment={selectedAppointment}
                    onClose={() =>
                        setSelectedAppointment(null)
                    }
                />
            )}

            {appointmentToCancel && (
                <CancelAppointmentModal
                    key={
                        appointmentToCancel.appointmentId
                    }
                    appointment={appointmentToCancel}
                    isSubmitting={
                        actionStatus === "loading"
                    }
                    errorMessage={actionError}
                    onConfirm={
                        handleConfirmCancellation
                    }
                    onClose={
                        closeCancellationModal
                    }
                />
            )}

            {appointmentToReview && (
                <ReviewModal
                    key={
                        appointmentToReview.appointmentId
                    }
                    appointment={appointmentToReview}
                    isSubmitting={
                        actionStatus === "loading"
                    }
                    errorMessage={actionError}
                    onSubmit={handleSubmitReview}
                    onClose={closeReviewModal}
                />
            )}
        </div>
    )
}

export default MyAppointmentsPage