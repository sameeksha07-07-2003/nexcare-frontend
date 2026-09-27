export default function DoctorCardSkeleton() {
    return (
        <div
            className="
                overflow-hidden rounded-2xl border
                border-nexcare-border bg-white p-3
                shadow-[0_10px_35px_rgba(16,39,63,0.05)]
                sm:p-4
            "
            aria-hidden="true"
        >
            <div
                className="
                    grid animate-pulse gap-5
                    lg:grid-cols-[150px_minmax(0,1.45fr)_minmax(330px,1fr)_auto]
                    lg:items-center
                "
            >
                <div
                    className="
                        h-52 rounded-xl bg-slate-200
                        sm:h-56 lg:h-32 lg:w-[150px]
                    "
                />

                <div>
                    <div className="h-6 w-52 rounded bg-slate-200" />
                    <div className="mt-3 h-7 w-32 rounded-full bg-slate-100" />
                    <div className="mt-4 h-4 w-4/5 rounded bg-slate-100" />
                    <div className="mt-3 h-4 w-3/5 rounded bg-slate-100" />
                </div>

                <div
                    className="
                        grid grid-cols-3 gap-4
                        border-y border-nexcare-border py-4
                        lg:border-y-0 lg:border-l lg:py-0 lg:pl-6
                    "
                >
                    {[1, 2, 3].map((item) => (
                        <div key={item}>
                            <div className="h-5 w-5 rounded bg-slate-200" />
                            <div className="mt-3 h-4 w-20 rounded bg-slate-200" />
                            <div className="mt-2 h-3 w-16 rounded bg-slate-100" />
                        </div>
                    ))}
                </div>

                <div
                    className="
                        flex flex-col gap-3 sm:flex-row
                        lg:min-w-[180px] lg:flex-col
                    "
                >
                    <div className="h-11 flex-1 rounded-xl bg-slate-100" />
                    <div className="h-11 flex-1 rounded-xl bg-slate-200" />
                </div>
            </div>
        </div>
    )
}