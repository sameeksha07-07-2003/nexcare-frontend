import {
    AlertCircle,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Info,
    LoaderCircle,
} from "lucide-react"
import {
    useEffect,
    useState,
} from "react"
import { useSearchParams } from "react-router-dom"

import {
    completeAppointment,
    getDoctorAppointments,
    getDoctorAppointmentSummary,
    markAppointmentNoShow,
} from "../api/appointmentApi"

import AppointmentOutcomeModal from "../components/doctor-appointments/AppointmentOutcomeModal"
import DoctorAppointmentCard from "../components/doctor-appointments/DoctorAppointmentCard"
import DoctorAppointmentDetailsModal from "../components/doctor-appointments/DoctorAppointmentDetailsModal"
import DoctorAppointmentSummary from "../components/doctor-appointments/DoctorAppointmentSummary"

import {
    getApiErrorMessage,
} from "../utils/appointmentUi"

const PAGE_SIZE = 10

const DOCTOR_SCOPES = [
    {
        key: "today",
        apiScope: "TODAY",
        label: "Today",
        countKey: "today",
    },
    {
        key: "upcoming",
        apiScope: "UPCOMING",
        label: "Upcoming",
        countKey: "upcoming",
    },
    {
        key: "needs-action",
        apiScope: "NEEDS_ACTION",
        label: "Needs Action",
        countKey: "needsAction",
    },
    {
        key: "completed",
        apiScope: "COMPLETED",
        label: "Completed",
        countKey: "completed",
    },
    {
        key: "cancelled",
        apiScope: "CANCELLED",
        label: "Cancelled",
        countKey: "cancelled",
    },
    {
        key: "no-show",
        apiScope: "NO_SHOW",
        label: "No Show",
        countKey: "noShow",
    },
]

const EMPTY_CONTENT = {
    TODAY: {
        title: "No appointments today",
        description:
            "Your remaining appointments for today will appear here.",
    },
    UPCOMING: {
        title: "No upcoming appointments",
        description:
            "Future patient appointments will appear here.",
    },
    NEEDS_ACTION: {
        title: "No appointments need action",
        description:
            "All past appointment outcomes are up to date.",
    },
    COMPLETED: {
        title: "No completed appointments",
        description:
            "Completed consultations will appear here.",
    },
    CANCELLED: {
        title: "No cancelled appointments",
        description:
            "Cancelled appointments will appear here.",
    },
    NO_SHOW: {
        title: "No no-show appointments",
        description:
            "Appointments marked as no-show will appear here.",
    },
}

function getScope(scopeKey) {
    return (
        DOCTOR_SCOPES.find(
            (scope) => scope.key === scopeKey,
        ) ??
        DOCTOR_SCOPES.find(
            (scope) =>
                scope.apiScope === "NEEDS_ACTION",
        )
    )
}

function ListSkeleton() {
    return (
        <div className="space-y-4">
            {[1, 2].map((item) => (
                <div
                    key={item}
                    className="h-48 animate-pulse rounded-2xl border border-[#DCEDEF] bg-white"
                />
            ))}
        </div>
    )
}

function DoctorAppointmentsPage() {
    const [searchParams, setSearchParams] =
        useSearchParams()

    const activeScope = getScope(
        searchParams.get("scope") ||
            "needs-action",
    )

    const requestedPage = Number(
        searchParams.get("page") || 0,
    )

    const currentPage =
        Number.isInteger(requestedPage) &&
        requestedPage >= 0
            ? requestedPage
            : 0

    const [summary, setSummary] = useState({
        today: 0,
        upcoming: 0,
        needsAction: 0,
        completed: 0,
        cancelled: 0,
        noShow: 0,
    })

    const [summaryLoading, setSummaryLoading] =
        useState(true)

    const [appointmentPage, setAppointmentPage] =
        useState(null)

    const [listStatus, setListStatus] =
        useState("loading")

    const [listError, setListError] = useState("")
    const [refreshVersion, setRefreshVersion] =
        useState(0)

    const [
        selectedAppointment,
        setSelectedAppointment,
    ] = useState(null)

    const [pendingOutcome, setPendingOutcome] =
        useState(null)

    const [actionStatus, setActionStatus] =
        useState("idle")

    const [actionError, setActionError] = useState("")
    const [successMessage, setSuccessMessage] =
        useState("")

    useEffect(() => {
        const controller = new AbortController()

        getDoctorAppointmentSummary({
            signal: controller.signal,
        })
            .then((response) => {
                setSummary(response)
            })
            .catch((error) => {
                if (
                    error?.code === "ERR_CANCELED" ||
                    error?.name === "CanceledError"
                ) {
                    return
                }

                setSummary({
                    today: 0,
                    upcoming: 0,
                    needsAction: 0,
                    completed: 0,
                    cancelled: 0,
                    noShow: 0,
                })
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setSummaryLoading(false)
                }
            })

        return () => controller.abort()
    }, [refreshVersion])

    useEffect(() => {
        const controller = new AbortController()

        getDoctorAppointments({
            scope: activeScope.apiScope,
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
                        "We could not load the appointments.",
                    ),
                )

                setListStatus("error")
            })

        return () => controller.abort()
    }, [
        activeScope.apiScope,
        currentPage,
        refreshVersion,
    ])

    function prepareForRequest() {
        setListStatus("loading")
        setListError("")
        setSuccessMessage("")
    }

    function changeScope(apiScope) {
        const nextScope =
            DOCTOR_SCOPES.find(
                (scope) =>
                    scope.apiScope === apiScope,
            ) ?? getScope("needs-action")

        prepareForRequest()

        setSearchParams({
            scope: nextScope.key,
            page: "0",
        })
    }

    function handleTabChange(scopeKey) {
        const nextScope = getScope(scopeKey)

        if (
            nextScope.key === activeScope.key &&
            currentPage === 0
        ) {
            return
        }

        changeScope(nextScope.apiScope)
    }

    function handlePageChange(nextPage) {
        const totalPages =
            appointmentPage?.totalPages ?? 0

        if (
            nextPage < 0 ||
            nextPage >= totalPages ||
            nextPage === currentPage
        ) {
            return
        }

        prepareForRequest()

        setSearchParams({
            scope: activeScope.key,
            page: String(nextPage),
        })

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    function openOutcome(
        appointment,
        action,
    ) {
        setActionError("")
        setActionStatus("idle")

        setPendingOutcome({
            appointment,
            action,
        })
    }

    function closeOutcome() {
        if (actionStatus === "loading") {
            return
        }

        setPendingOutcome(null)
        setActionError("")
        setActionStatus("idle")
    }

    function refreshAppointments(message) {
        setSuccessMessage(message)
        setListStatus("loading")
        setListError("")

        setRefreshVersion(
            (version) => version + 1,
        )
    }

    function handleRetry() {
        setListStatus("loading")
        setListError("")

        setRefreshVersion(
            (version) => version + 1,
        )
    }

    async function confirmOutcome() {
        if (!pendingOutcome) {
            return
        }

        const {
            appointment,
            action,
        } = pendingOutcome

        try {
            setActionStatus("loading")
            setActionError("")

            if (action === "COMPLETE") {
                await completeAppointment(
                    appointment.appointmentId,
                )
            } else {
                await markAppointmentNoShow(
                    appointment.appointmentId,
                )
            }

            setPendingOutcome(null)
            setActionStatus("idle")

            refreshAppointments(
                action === "COMPLETE"
                    ? "The appointment was marked as completed."
                    : "The appointment was marked as no-show.",
            )
        } catch (error) {
            setActionError(
                getApiErrorMessage(
                    error,
                    "We could not update this appointment.",
                ),
            )

            setActionStatus("error")
        }
    }

    const appointments =
        appointmentPage?.content ?? []

    const totalPages =
        appointmentPage?.totalPages ?? 0

    const emptyContent =
        EMPTY_CONTENT[activeScope.apiScope]

    const orderLabel =
        activeScope.apiScope === "UPCOMING" ||
        activeScope.apiScope === "TODAY"
            ? "Upcoming First"
            : "Latest First"

    return (
        <div className="min-h-full">
            <div className="mx-auto max-w-screen-2xl">
                <header>
                    <h1 className="text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
                        Appointment Management
                    </h1>

                    <p className="mt-2 text-sm text-[#52709B] sm:text-base">
                        Review your schedule and update
                        patient appointment outcomes.
                    </p>
                </header>

                <div className="mt-7">
                    <DoctorAppointmentSummary
                        summary={summary}
                        activeScope={
                            activeScope.apiScope
                        }
                        isLoading={summaryLoading}
                        onScopeChange={changeScope}
                    />
                </div>

                {successMessage && (
                    <div
                        role="status"
                        className="mt-5 flex items-center justify-between rounded-xl border border-[#B9E5D0] bg-[#F0FBF5] px-4 py-3 text-sm font-medium text-[#176A3A]"
                    >
                        <span>{successMessage}</span>

                        <button
                            type="button"
                            onClick={() =>
                                setSuccessMessage("")
                            }
                            aria-label="Dismiss message"
                        >
                            ×
                        </button>
                    </div>
                )}

                <section className="mt-6">
                    <div className="flex flex-col gap-4 rounded-2xl border border-[#DCEDEF] bg-white px-4 py-3 xl:flex-row xl:items-center xl:justify-between">
                        <div
                            role="tablist"
                            aria-label="Doctor appointment scopes"
                            className="flex overflow-x-auto"
                        >
                            {DOCTOR_SCOPES.map(
                                (scope) => {
                                    const isActive =
                                        activeScope.key ===
                                        scope.key

                                    return (
                                        <button
                                            key={
                                                scope.key
                                            }
                                            type="button"
                                            role="tab"
                                            aria-selected={
                                                isActive
                                            }
                                            onClick={() =>
                                                handleTabChange(
                                                    scope.key,
                                                )
                                            }
                                            className={[
                                                "relative shrink-0 px-4 py-3",
                                                "text-sm font-semibold transition",
                                                isActive
                                                    ? "text-[#079A99]"
                                                    : "text-[#52709B] hover:text-[#079A99]",
                                            ].join(
                                                " ",
                                            )}
                                        >
                                            {scope.label} (
                                            {summary?.[
                                                scope
                                                    .countKey
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

                        <div className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[#D3E6EB] px-4 py-2.5 text-sm font-semibold text-[#385574] xl:self-auto">
                            <CalendarDays
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            {orderLabel}
                        </div>
                    </div>

                    {activeScope.apiScope ===
                        "NEEDS_ACTION" && (
                        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#D9EAF4] bg-[#EFF8FD] px-4 py-3 text-sm text-[#35658F]">
                            <Info
                                className="mt-0.5 h-5 w-5 shrink-0 text-[#168CE2]"
                                aria-hidden="true"
                            />

                            These appointments have passed.
                            Record an outcome to keep patient
                            history accurate.
                        </div>
                    )}

                    <div className="mt-5">
                        {listStatus === "loading" && (
                            <ListSkeleton />
                        )}

                        {listStatus === "error" && (
                            <div className="rounded-2xl border border-[#F3CCD3] bg-white px-6 py-12 text-center">
                                <AlertCircle className="mx-auto h-10 w-10 text-[#EA2945]" />

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
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0EA5A5] px-5 py-3 text-sm font-semibold text-white"
                                >
                                    <LoaderCircle className="h-4 w-4" />
                                    Try Again
                                </button>
                            </div>
                        )}

                        {listStatus === "success" &&
                            appointments.length ===
                                0 && (
                                <div className="rounded-2xl border border-[#DCEDEF] bg-white px-6 py-14 text-center">
                                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F8F6]">
                                        <CalendarDays className="h-8 w-8 text-[#0EA5A5]" />
                                    </span>

                                    <h2 className="mt-5 text-xl font-bold text-[#071E4A]">
                                        {
                                            emptyContent.title
                                        }
                                    </h2>

                                    <p className="mt-2 text-sm text-[#54708A]">
                                        {
                                            emptyContent.description
                                        }
                                    </p>
                                </div>
                            )}

                        {listStatus === "success" &&
                            appointments.length >
                                0 && (
                                <div className="space-y-4">
                                    {appointments.map(
                                        (
                                            appointment,
                                        ) => (
                                            <DoctorAppointmentCard
                                                key={
                                                    appointment.appointmentId
                                                }
                                                appointment={
                                                    appointment
                                                }
                                                activeScope={
                                                    activeScope.apiScope
                                                }
                                                onViewDetails={
                                                    setSelectedAppointment
                                                }
                                                onComplete={(
                                                    selected,
                                                ) =>
                                                    openOutcome(
                                                        selected,
                                                        "COMPLETE",
                                                    )
                                                }
                                                onNoShow={(
                                                    selected,
                                                ) =>
                                                    openOutcome(
                                                        selected,
                                                        "NO_SHOW",
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
                            <nav className="mt-7 flex flex-wrap justify-center gap-2">
                                <button
                                    type="button"
                                    disabled={
                                        appointmentPage?.first
                                    }
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage - 1,
                                        )
                                    }
                                    className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#D3E6EB] bg-white px-4 text-sm font-semibold text-[#385574] disabled:opacity-40"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </button>

                                {Array.from(
                                    {
                                        length: totalPages,
                                    },
                                    (_, index) => index,
                                ).map((pageNumber) => (
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
                                            "h-11 min-w-11 rounded-xl border",
                                            "text-sm font-semibold",
                                            pageNumber ===
                                            currentPage
                                                ? "border-[#0EA5A5] bg-[#0EA5A5] text-white"
                                                : "border-[#D3E6EB] bg-white text-[#385574]",
                                        ].join(" ")}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    disabled={
                                        appointmentPage?.last
                                    }
                                    onClick={() =>
                                        handlePageChange(
                                            currentPage + 1,
                                        )
                                    }
                                    className="inline-flex h-11 items-center gap-1 rounded-xl border border-[#D3E6EB] bg-white px-4 text-sm font-semibold text-[#385574] disabled:opacity-40"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </nav>
                        )}
                </section>
            </div>

            {selectedAppointment && (
                <DoctorAppointmentDetailsModal
                    appointment={selectedAppointment}
                    activeScope={
                        activeScope.apiScope
                    }
                    onClose={() =>
                        setSelectedAppointment(null)
                    }
                />
            )}

            {pendingOutcome && (
                <AppointmentOutcomeModal
                    appointment={
                        pendingOutcome.appointment
                    }
                    action={pendingOutcome.action}
                    isSubmitting={
                        actionStatus === "loading"
                    }
                    errorMessage={actionError}
                    onConfirm={confirmOutcome}
                    onClose={closeOutcome}
                />
            )}
        </div>
    )
}

export default DoctorAppointmentsPage