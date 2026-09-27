import { useEffect, useState } from "react"
import {
    ChevronLeft,
    ChevronRight,
    HeartPulse,
    RefreshCw,
    ShieldCheck,
    SlidersHorizontal,
    Stethoscope,
} from "lucide-react"
import HomeNavbar from "../components/home/HomeNavbar"
import DoctorCard from "../components/doctors/DoctorCard"
import DoctorCardSkeleton from "../components/doctors/DoctorCardSkeleton"
import DoctorFilters from "../components/doctors/DoctorFilters"
import {
    DOCTORS_PAGE_SIZE,
    getDoctorFilterOptions,
    getDoctors,
} from "../api/doctorApi"

const EMPTY_FILTERS = {
    search: "",
    city: "",
    specialization: "",
    qualification: "",
    minExperience: "",
}

const EMPTY_FILTER_OPTIONS = {
    cities: [],
    specializations: [],
    qualifications: [],
}

const EMPTY_RESULT = {
    content: [],
    number: 0,
    size: DOCTORS_PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
}

const SORT_OPTIONS = [
    {
        value: "rating",
        label: "Highest rated",
    },
    {
        value: "experience",
        label: "Most experienced",
    },
    {
        value: "fee-low",
        label: "Fee: low to high",
    },
    {
        value: "fee-high",
        label: "Fee: high to low",
    },
    {
        value: "name",
        label: "Name: A to Z",
    },
]

function getErrorMessage(error) {
    if (error?.code === "ERR_CANCELED") {
        return null
    }

    return (
        error?.response?.data?.message
        || error?.message
        || "We could not load doctors. Please try again."
    )
}

function buildVisiblePages(
    currentPage,
    totalPages,
) {
    if (totalPages <= 5) {
        return Array.from(
            { length: totalPages },
            (_, index) => index,
        )
    }

    let start = Math.max(0, currentPage - 2)
    let end = Math.min(
        totalPages - 1,
        start + 4,
    )

    start = Math.max(0, end - 4)

    return Array.from(
        { length: end - start + 1 },
        (_, index) => start + index,
    )
}

function DiscoveryHero() {
    return (
        <section
            className="
                relative overflow-hidden border-b
                border-nexcare-border/70
                bg-gradient-to-br
                from-[#ECFBF9] via-[#F5FCFC] to-[#EAF6FB]
            "
        >
            <div
                className="
                    pointer-events-none absolute -right-16 -top-20
                    h-72 w-72 rounded-full
                    bg-nexcare-teal/10 blur-3xl
                "
                aria-hidden="true"
            />

            <div
                className="
                    pointer-events-none absolute -left-20 bottom-0
                    h-56 w-56 rounded-full
                    bg-cyan-300/15 blur-3xl
                "
                aria-hidden="true"
            />

            <div
                className="
                    mx-auto grid max-w-screen-2xl gap-8
                    px-5 py-10
                    sm:px-8 sm:py-12
                    lg:grid-cols-[1fr_auto]
                    lg:items-center lg:px-16
                "
            >
                <div className="max-w-3xl">
                    <div
                        className="
                            mb-4 inline-flex items-center gap-2
                            rounded-full border
                            border-nexcare-teal/20
                            bg-white/80 px-3 py-1.5
                            text-sm font-semibold
                            text-nexcare-tealDark
                        "
                    >
                        <ShieldCheck
                            className="h-4 w-4"
                            aria-hidden="true"
                        />
                        Verified healthcare professionals
                    </div>

                    <h1
                        className="
                            font-heading text-3xl font-bold
                            tracking-tight text-nexcare-navy
                            sm:text-4xl lg:text-5xl
                        "
                    >
                        Find the right doctor for you
                    </h1>

                    <p
                        className="
                            mt-4 max-w-2xl text-base leading-7
                            text-nexcare-textSecondary
                            sm:text-lg
                        "
                    >
                        Search verified doctors, compare their
                        experience and ratings, then check real
                        appointment availability before signing in.
                    </p>
                </div>

                <div
                    className="
                        hidden items-center gap-4 rounded-2xl
                        border border-white/80 bg-white/75
                        px-5 py-4
                        shadow-[0_14px_40px_rgba(16,39,63,0.07)]
                        backdrop-blur-sm lg:flex
                    "
                >
                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-full bg-nexcare-tealLight
                            text-nexcare-teal
                        "
                    >
                        <HeartPulse
                            className="h-6 w-6"
                            aria-hidden="true"
                        />
                    </div>

                    <div>
                        <p
                            className="
                                font-semibold text-nexcare-navy
                            "
                        >
                            Care that fits your needs
                        </p>

                        <p
                            className="
                                mt-1 text-sm
                                text-nexcare-textSecondary
                            "
                        >
                            Browse first. Sign in only to book.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

function EmptyResults({ onClear }) {
    return (
        <div
            className="
                rounded-2xl border border-dashed
                border-nexcare-border bg-white
                px-6 py-14 text-center
            "
        >
            <div
                className="
                    mx-auto flex h-14 w-14 items-center
                    justify-center rounded-full
                    bg-nexcare-tealLight text-nexcare-teal
                "
            >
                <Stethoscope
                    className="h-7 w-7"
                    aria-hidden="true"
                />
            </div>

            <h2
                className="
                    mt-5 font-heading text-xl font-bold
                    text-nexcare-navy
                "
            >
                No doctors match these filters
            </h2>

            <p
                className="
                    mx-auto mt-2 max-w-md text-sm leading-6
                    text-nexcare-textSecondary
                "
            >
                Try another city, specialization or experience
                range, or clear the filters to view all approved
                doctors.
            </p>

            <button
                type="button"
                onClick={onClear}
                className="
                    mt-6 inline-flex min-h-11 items-center
                    justify-center rounded-xl bg-nexcare-teal
                    px-5 py-2.5 text-sm font-semibold
                    text-white transition
                    hover:bg-nexcare-tealDark
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-nexcare-teal
                    focus-visible:ring-offset-2
                "
            >
                Clear filters
            </button>
        </div>
    )
}

function ErrorState({ message, onRetry }) {
    return (
        <div
            role="alert"
            className="
                rounded-2xl border border-red-100
                bg-red-50 px-6 py-10 text-center
            "
        >
            <h2
                className="
                    font-heading text-xl font-bold text-red-800
                "
            >
                Unable to load doctors
            </h2>

            <p className="mt-2 text-sm text-red-700">
                {message}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="
                    mt-6 inline-flex min-h-11 items-center
                    justify-center gap-2 rounded-xl
                    border border-red-200 bg-white
                    px-5 py-2.5 text-sm font-semibold
                    text-red-700 transition
                    hover:bg-red-100
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-red-400
                "
            >
                <RefreshCw
                    className="h-4 w-4"
                    aria-hidden="true"
                />
                Try again
            </button>
        </div>
    )
}

export default function DoctorDiscoveryPage() {
    const [draftFilters, setDraftFilters] =
        useState(EMPTY_FILTERS)

    const [appliedFilters, setAppliedFilters] =
        useState(EMPTY_FILTERS)

    const [filterOptions, setFilterOptions] =
        useState(EMPTY_FILTER_OPTIONS)

    const [sort, setSort] = useState("rating")
    const [page, setPage] = useState(0)
    const [result, setResult] = useState(EMPTY_RESULT)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function loadFilterOptions() {
            try {
                const data =
                    await getDoctorFilterOptions({
                        signal: controller.signal,
                    })

                setFilterOptions({
                    cities: data.cities ?? [],
                    specializations:
                        data.specializations ?? [],
                    qualifications:
                        data.qualifications ?? [],
                })
            } catch (requestError) {
                if (
                    requestError?.code
                    !== "ERR_CANCELED"
                ) {
                    setFilterOptions(
                        EMPTY_FILTER_OPTIONS,
                    )
                }
            }
        }

        void loadFilterOptions()

        return () => controller.abort()
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        async function loadDoctors() {
            try {
                const data = await getDoctors({
                    ...appliedFilters,
                    sort,
                    page,
                    size: DOCTORS_PAGE_SIZE,
                    signal: controller.signal,
                })

                setResult(data)
                setError(null)
            } catch (requestError) {
                const message =
                    getErrorMessage(requestError)

                if (message) {
                    setError(message)
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        void loadDoctors()

        return () => controller.abort()
    }, [appliedFilters, page, sort])

    function prepareRequest() {
        setIsLoading(true)
        setError(null)
    }

    function handleSearch() {
        prepareRequest()
        setPage(0)
        setAppliedFilters({
            ...draftFilters,
        })
    }

    function handleClearFilters() {
        prepareRequest()
        setDraftFilters(EMPTY_FILTERS)
        setAppliedFilters(EMPTY_FILTERS)
        setPage(0)
    }

    function handleSortChange(event) {
        prepareRequest()
        setSort(event.target.value)
        setPage(0)
    }

    function handlePageChange(nextPage) {
        if (
            nextPage < 0
            || nextPage >= result.totalPages
            || nextPage === page
        ) {
            return
        }

        prepareRequest()
        setPage(nextPage)

        window.scrollTo({
            top: 360,
            behavior: "smooth",
        })
    }

    function retryRequest() {
        /*
         * Incrementing through a copied object gives the effect a new
         * dependency reference and safely repeats the same request.
         */
        prepareRequest()
        setAppliedFilters((current) => ({
            ...current,
        }))
    }

    const visiblePages = buildVisiblePages(
        result.number ?? page,
        result.totalPages ?? 0,
    )

    return (
        <div className="min-h-screen bg-nexcare-canvas">
            <HomeNavbar />

            <main>
                <DiscoveryHero />

                <div
                    className="
                        mx-auto max-w-screen-2xl
                        px-5 pb-16 sm:px-8 lg:px-16
                    "
                >
                    <div className="-mt-1 sm:-mt-2">
                        <DoctorFilters
                            filters={draftFilters}
                            filterOptions={filterOptions}
                            onChange={setDraftFilters}
                            onSubmit={handleSearch}
                            onClear={handleClearFilters}
                            isLoading={isLoading}
                        />
                    </div>

                    <section
                        className="mt-8"
                        aria-labelledby="doctor-results-title"
                    >
                        <div
                            className="
                                mb-5 flex flex-col gap-4
                                sm:flex-row sm:items-end
                                sm:justify-between
                            "
                        >
                            <div>
                                <p
                                    className="
                                        inline-flex items-center gap-2
                                        text-sm font-semibold
                                        text-nexcare-tealDark
                                    "
                                >
                                    <Stethoscope
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Approved doctors
                                </p>

                                <h2
                                    id="doctor-results-title"
                                    className="
                                        mt-1 font-heading text-2xl
                                        font-bold text-nexcare-navy
                                        sm:text-3xl
                                    "
                                >
                                    Doctors near you
                                </h2>

                                <p
                                    className="
                                        mt-1 text-sm
                                        text-nexcare-textSecondary
                                    "
                                    aria-live="polite"
                                >
                                    {isLoading
                                        ? "Finding suitable doctors..."
                                        : `${result.totalElements ?? 0} doctors found`}
                                </p>
                            </div>

                            <div className="sm:min-w-[220px]">
                                <label
                                    htmlFor="doctor-sort"
                                    className="
                                        mb-2 flex items-center gap-2
                                        text-sm font-semibold
                                        text-nexcare-navy
                                    "
                                >
                                    <SlidersHorizontal
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Sort results
                                </label>

                                <select
                                    id="doctor-sort"
                                    value={sort}
                                    onChange={
                                        handleSortChange
                                    }
                                    disabled={isLoading}
                                    className="
                                        min-h-11 w-full rounded-xl
                                        border border-nexcare-border
                                        bg-white px-3 py-2
                                        text-sm text-nexcare-navy
                                        outline-none transition
                                        focus:border-nexcare-teal
                                        focus:ring-2
                                        focus:ring-nexcare-teal/15
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {SORT_OPTIONS.map(
                                        (option) => (
                                            <option
                                                key={
                                                    option.value
                                                }
                                                value={
                                                    option.value
                                                }
                                            >
                                                {
                                                    option.label
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                            </div>
                        </div>

                        {isLoading && (
                            <div
                                className="space-y-4"
                                aria-label="Loading doctors"
                            >
                                {Array.from(
                                    {
                                        length:
                                            DOCTORS_PAGE_SIZE,
                                    },
                                    (_, index) => (
                                        <DoctorCardSkeleton
                                            key={index}
                                        />
                                    ),
                                )}
                            </div>
                        )}

                        {!isLoading && error && (
                            <ErrorState
                                message={error}
                                onRetry={retryRequest}
                            />
                        )}

                        {!isLoading
                            && !error
                            && result.content.length === 0 && (
                                <EmptyResults
                                    onClear={
                                        handleClearFilters
                                    }
                                />
                            )}

                        {!isLoading
                            && !error
                            && result.content.length > 0 && (
                                <>
                                    <div className="space-y-4">
                                        {result.content.map(
                                            (doctor) => (
                                                <DoctorCard
                                                    key={
                                                        doctor.doctorId
                                                    }
                                                    doctor={
                                                        doctor
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>

                                    {result.totalPages > 1 && (
                                        <nav
                                            className="
                                                mt-8 flex flex-wrap
                                                items-center
                                                justify-center gap-2
                                            "
                                            aria-label="Doctor result pages"
                                        >
                                            <button
                                                type="button"
                                                disabled={
                                                    result.first
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        page - 1,
                                                    )
                                                }
                                                className="
                                                    inline-flex h-10 w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl border
                                                    border-nexcare-border
                                                    bg-white
                                                    text-nexcare-navy
                                                    transition
                                                    hover:border-nexcare-teal
                                                    hover:text-nexcare-teal
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-40
                                                "
                                                aria-label="Previous page"
                                            >
                                                <ChevronLeft
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </button>

                                            {visiblePages.map(
                                                (
                                                    pageNumber,
                                                ) => {
                                                    const isCurrent =
                                                        pageNumber
                                                        === result.number

                                                    return (
                                                        <button
                                                            type="button"
                                                            key={
                                                                pageNumber
                                                            }
                                                            onClick={() =>
                                                                handlePageChange(
                                                                    pageNumber,
                                                                )
                                                            }
                                                            aria-current={
                                                                isCurrent
                                                                    ? "page"
                                                                    : undefined
                                                            }
                                                            className={`
                                                                inline-flex h-10 min-w-10
                                                                items-center justify-center
                                                                rounded-xl border px-3
                                                                text-sm font-semibold
                                                                transition
                                                                ${
                                                                    isCurrent
                                                                        ? "border-nexcare-teal bg-nexcare-teal text-white shadow-[0_6px_18px_rgba(14,163,148,0.22)]"
                                                                        : "border-nexcare-border bg-white text-nexcare-navy hover:border-nexcare-teal hover:text-nexcare-teal"
                                                                }
                                                            `}
                                                        >
                                                            {pageNumber
                                                                + 1}
                                                        </button>
                                                    )
                                                },
                                            )}

                                            <button
                                                type="button"
                                                disabled={
                                                    result.last
                                                }
                                                onClick={() =>
                                                    handlePageChange(
                                                        page + 1,
                                                    )
                                                }
                                                className="
                                                    inline-flex h-10 w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl border
                                                    border-nexcare-border
                                                    bg-white
                                                    text-nexcare-navy
                                                    transition
                                                    hover:border-nexcare-teal
                                                    hover:text-nexcare-teal
                                                    disabled:cursor-not-allowed
                                                    disabled:opacity-40
                                                "
                                                aria-label="Next page"
                                            >
                                                <ChevronRight
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </nav>
                                    )}
                                </>
                            )}
                    </section>
                </div>
            </main>
        </div>
    )
}