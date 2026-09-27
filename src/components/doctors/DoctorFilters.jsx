import {
    BriefcaseMedical,
    GraduationCap,
    MapPin,
    Search,
    Stethoscope,
    X,
} from "lucide-react"

const EXPERIENCE_OPTIONS = [
    { value: "", label: "Any experience" },
    { value: "2", label: "2+ years" },
    { value: "5", label: "5+ years" },
    { value: "10", label: "10+ years" },
    { value: "15", label: "15+ years" },
]

function FilterSelect({
    id,
    label,
    icon: Icon,
    value,
    placeholder,
    options,
    onChange,
}) {
    return (
        <div className="min-w-0">
            <label
                htmlFor={id}
                className="
                    mb-2 block text-sm font-semibold
                    text-nexcare-navy
                "
            >
                {label}
            </label>

            <div className="relative">
                <Icon
                    className="
                        pointer-events-none absolute left-3.5 top-1/2
                        h-4.5 w-4.5 -translate-y-1/2
                        text-nexcare-textSecondary
                    "
                    aria-hidden="true"
                />

                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="
                        min-h-12 w-full appearance-none rounded-xl
                        border border-nexcare-border bg-white
                        py-2.5 pl-10 pr-9 text-sm
                        text-nexcare-navy outline-none
                        transition
                        hover:border-nexcare-teal/50
                        focus:border-nexcare-teal
                        focus:ring-2 focus:ring-nexcare-teal/15
                    "
                >
                    <option value="">
                        {placeholder}
                    </option>

                    {options.map((option) => {
                        const optionValue =
                            typeof option === "string"
                                ? option
                                : option.value

                        const optionLabel =
                            typeof option === "string"
                                ? option
                                : option.label

                        return (
                            <option
                                key={optionValue}
                                value={optionValue}
                            >
                                {optionLabel}
                            </option>
                        )
                    })}
                </select>

                <span
                    className="
                        pointer-events-none absolute right-3.5
                        top-1/2 -translate-y-1/2
                        text-xs text-nexcare-textSecondary
                    "
                    aria-hidden="true"
                >
                    ▼
                </span>
            </div>
        </div>
    )
}

export default function DoctorFilters({
    filters,
    filterOptions,
    onChange,
    onSubmit,
    onClear,
    isLoading,
}) {
    const hasFilters = Boolean(
        filters.search
        || filters.city
        || filters.specialization
        || filters.qualification
        || filters.minExperience,
    )

    function updateField(field, value) {
        onChange({
            ...filters,
            [field]: value,
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="
                rounded-2xl border border-nexcare-border
                bg-white p-4
                shadow-[0_12px_40px_rgba(16,39,63,0.07)]
                sm:p-5
            "
        >
            <div
                className="
                    grid gap-4
                    md:grid-cols-2
                    xl:grid-cols-[1.35fr_0.85fr_1fr_1fr_0.9fr_auto]
                    xl:items-end
                "
            >
                <div className="min-w-0">
                    <label
                        htmlFor="doctor-search"
                        className="
                            mb-2 block text-sm font-semibold
                            text-nexcare-navy
                        "
                    >
                        Doctor or hospital
                    </label>

                    <div className="relative">
                        <Search
                            className="
                                pointer-events-none absolute left-3.5
                                top-1/2 h-5 w-5 -translate-y-1/2
                                text-nexcare-textSecondary
                            "
                            aria-hidden="true"
                        />

                        <input
                            id="doctor-search"
                            type="search"
                            value={filters.search}
                            onChange={(event) =>
                                updateField(
                                    "search",
                                    event.target.value,
                                )
                            }
                            placeholder="Search doctor or hospital"
                            autoComplete="off"
                            className="
                                min-h-12 w-full rounded-xl border
                                border-nexcare-border bg-white
                                py-2.5 pl-11 pr-4 text-sm
                                text-nexcare-navy outline-none
                                transition
                                placeholder:text-slate-400
                                hover:border-nexcare-teal/50
                                focus:border-nexcare-teal
                                focus:ring-2
                                focus:ring-nexcare-teal/15
                            "
                        />
                    </div>
                </div>

                <FilterSelect
                    id="doctor-city"
                    label="City"
                    icon={MapPin}
                    value={filters.city}
                    placeholder="Select city"
                    options={filterOptions.cities}
                    onChange={(event) =>
                        updateField(
                            "city",
                            event.target.value,
                        )
                    }
                />

                <FilterSelect
                    id="doctor-specialization"
                    label="Specialization"
                    icon={Stethoscope}
                    value={filters.specialization}
                    placeholder="All specializations"
                    options={
                        filterOptions.specializations
                    }
                    onChange={(event) =>
                        updateField(
                            "specialization",
                            event.target.value,
                        )
                    }
                />

                <FilterSelect
                    id="doctor-qualification"
                    label="Qualification"
                    icon={GraduationCap}
                    value={filters.qualification}
                    placeholder="Any qualification"
                    options={
                        filterOptions.qualifications
                    }
                    onChange={(event) =>
                        updateField(
                            "qualification",
                            event.target.value,
                        )
                    }
                />

                <FilterSelect
                    id="doctor-experience"
                    label="Experience"
                    icon={BriefcaseMedical}
                    value={filters.minExperience}
                    placeholder="Any experience"
                    options={EXPERIENCE_OPTIONS.slice(1)}
                    onChange={(event) =>
                        updateField(
                            "minExperience",
                            event.target.value,
                        )
                    }
                />

                <div className="flex gap-2 md:col-span-2 xl:col-span-1">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="
                            inline-flex min-h-12 flex-1 items-center
                            justify-center gap-2 rounded-xl
                            bg-nexcare-teal px-5 py-2.5
                            text-sm font-semibold text-white
                            shadow-[0_8px_20px_rgba(14,163,148,0.22)]
                            transition
                            hover:bg-nexcare-tealDark
                            disabled:cursor-not-allowed
                            disabled:opacity-65
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-nexcare-teal
                            focus-visible:ring-offset-2
                        "
                    >
                        <Search
                            className="h-4.5 w-4.5"
                            aria-hidden="true"
                        />

                        {isLoading
                            ? "Searching..."
                            : "Search"}
                    </button>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={onClear}
                            aria-label="Clear all filters"
                            title="Clear all filters"
                            className="
                                inline-flex min-h-12 min-w-12
                                items-center justify-center
                                rounded-xl border
                                border-nexcare-border bg-white
                                text-nexcare-textSecondary
                                transition
                                hover:border-red-200
                                hover:bg-red-50
                                hover:text-red-600
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-nexcare-teal
                            "
                        >
                            <X
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}