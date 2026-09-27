import {
    CalendarClock,
    CircleAlert,
    Clock3,
    LoaderCircle,
    Pencil,
    Plus,
    Power,
    RotateCcw,
    Users,
    X,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import {
    createDoctorAvailability,
    deactivateDoctorAvailability,
    getMyDoctorAvailabilities,
    reactivateDoctorAvailability,
    updateDoctorAvailability,
} from "../api/doctorApi"
import { useProfile } from "../context/ProfileContext"

const DAYS = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY", "SUNDAY",
]

const EMPTY_FORM = {
    dayOfWeek: "MONDAY",
    startTime: "09:00",
    endTime: "13:00",
    maxPatientsAllowed: "5",
}

function formatTime(value) {
    if (!value) return ""
    const [hours, minutes] = value.split(":").map(Number)
    const date = new Date(2000, 0, 1, hours, minutes)
    return new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}

export default function DoctorAvailabilityPage() {
    const { profile } = useProfile()
    const [items, setItems] = useState([])
    const [status, setStatus] = useState("loading")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [form, setForm] = useState(EMPTY_FORM)
    const [editingId, setEditingId] = useState(null)
    const [saving, setSaving] = useState(false)
    const [refreshVersion, setRefreshVersion] = useState(0)

    const loadAvailability = useCallback((signal) => {
        return getMyDoctorAvailabilities({ signal })
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        loadAvailability(controller.signal)
            .then((response) => {
                setItems(response ?? [])
                setStatus("success")
            })
            .catch((requestError) => {
                if (requestError?.code === "ERR_CANCELED") return
                setError(
                    requestError?.response?.data?.message ||
                    "We could not load your availability.",
                )
                setStatus("error")
            })

        return () => controller.abort()
    }, [loadAvailability, refreshVersion])

    function refresh(message = "") {
        setSuccess(message)
        setError("")
        setStatus("loading")
        setRefreshVersion((value) => value + 1)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    function startEditing(item) {
        setEditingId(item.id)
        setForm({
            dayOfWeek: item.dayOfWeek,
            startTime: item.startTime.slice(0, 5),
            endTime: item.endTime.slice(0, 5),
            maxPatientsAllowed: String(item.maxPatientsAllowed),
        })
        setError("")
        setSuccess("")
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    function resetForm() {
        setEditingId(null)
        setForm(EMPTY_FORM)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setSuccess("")

        if (form.endTime <= form.startTime) {
            setError("End time must be after start time.")
            return
        }

        setSaving(true)
        const payload = {
            dayOfWeek: form.dayOfWeek,
            startTime: `${form.startTime}:00`,
            endTime: `${form.endTime}:00`,
            maxPatientsAllowed: Number(form.maxPatientsAllowed),
        }

        try {
            if (editingId) {
                await updateDoctorAvailability(editingId, payload)
            } else {
                await createDoctorAvailability(payload)
            }
            const message = editingId
                ? "Availability updated successfully."
                : "Availability created successfully."
            resetForm()
            refresh(message)
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                "We could not save this availability.",
            )
        } finally {
            setSaving(false)
        }
    }

    async function changeActiveState(item) {
        setError("")
        setSuccess("")
        try {
            if (item.active) {
                await deactivateDoctorAvailability(item.id)
            } else {
                await reactivateDoctorAvailability(item.id)
            }
            refresh(
                item.active
                    ? "Availability deactivated. Existing appointments remain unchanged."
                    : "Availability reactivated.",
            )
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                "We could not change this availability.",
            )
        }
    }

    return (
        <div className="mx-auto max-w-6xl">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
                    Availability
                </h1>
                <p className="mt-2 text-sm text-[#52709B] sm:text-base">
                    Publish recurring consultation sessions and control patient capacity.
                </p>
            </header>

            {profile?.verificationStatus !== "APPROVED" && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
                    You can prepare your schedule, but patients cannot see or book it until your profile is approved.
                </div>
            )}

            <div className="mt-6 grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
                <form onSubmit={handleSubmit} className="h-fit rounded-2xl border border-[#DCEDEF] bg-white p-5 shadow-[0_10px_35px_rgba(16,39,63,0.05)]">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F6F4] text-[#0EA394]">
                                <CalendarClock className="h-5 w-5" />
                            </span>
                            <h2 className="text-lg font-bold text-[#10273F]">
                                {editingId ? "Edit session" : "Add session"}
                            </h2>
                        </div>
                        {editingId && (
                            <button type="button" onClick={resetForm} aria-label="Cancel editing" className="rounded-lg p-2 text-[#54708A] hover:bg-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    <label className="mt-5 block text-sm font-semibold text-[#10273F]">
                        Day
                        <select name="dayOfWeek" value={form.dayOfWeek} onChange={handleChange} className="mt-2 w-full rounded-xl border border-[#DCEDEF] bg-white px-4 py-3 outline-none focus:border-[#0EA394]">
                            {DAYS.map((day) => <option key={day} value={day}>{day.charAt(0) + day.slice(1).toLowerCase()}</option>)}
                        </select>
                    </label>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <label className="text-sm font-semibold text-[#10273F]">
                            Start time
                            <input type="time" name="startTime" value={form.startTime} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-[#DCEDEF] px-3 py-3 outline-none focus:border-[#0EA394]" />
                        </label>
                        <label className="text-sm font-semibold text-[#10273F]">
                            End time
                            <input type="time" name="endTime" value={form.endTime} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-[#DCEDEF] px-3 py-3 outline-none focus:border-[#0EA394]" />
                        </label>
                    </div>

                    <label className="mt-4 block text-sm font-semibold text-[#10273F]">
                        Maximum patients
                        <input type="number" name="maxPatientsAllowed" value={form.maxPatientsAllowed} onChange={handleChange} min="1" max="100" required className="mt-2 w-full rounded-xl border border-[#DCEDEF] px-4 py-3 outline-none focus:border-[#0EA394]" />
                    </label>

                    {error && <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
                    {success && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">{success}</p>}

                    <button type="submit" disabled={saving} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0EA394] px-5 text-sm font-semibold text-white hover:bg-[#0B7F73] disabled:opacity-60">
                        {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : editingId ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {saving ? "Saving..." : editingId ? "Update session" : "Add session"}
                    </button>
                </form>

                <section>
                    {status === "loading" && (
                        <div className="flex min-h-52 items-center justify-center rounded-2xl border border-[#DCEDEF] bg-white text-[#54708A]">
                            <LoaderCircle className="mr-3 h-5 w-5 animate-spin text-[#0EA394]" /> Loading schedule...
                        </div>
                    )}

                    {status === "error" && (
                        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
                            <CircleAlert className="mx-auto h-9 w-9 text-red-500" />
                            <p className="mt-3 text-sm text-[#54708A]">{error}</p>
                            <button type="button" onClick={() => refresh()} className="mt-4 rounded-xl bg-[#0EA394] px-5 py-2.5 text-sm font-semibold text-white">Try again</button>
                        </div>
                    )}

                    {status === "success" && items.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-[#CFE3E7] bg-white p-10 text-center">
                            <CalendarClock className="mx-auto h-10 w-10 text-[#0EA394]" />
                            <h2 className="mt-4 text-lg font-bold text-[#10273F]">No availability added</h2>
                            <p className="mt-2 text-sm text-[#54708A]">Add your first recurring consultation session.</p>
                        </div>
                    )}

                    {status === "success" && items.length > 0 && (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <article key={item.id} className={`rounded-2xl border bg-white p-5 shadow-[0_8px_30px_rgba(16,39,63,0.04)] ${item.active ? "border-[#DCEDEF]" : "border-slate-200 opacity-70"}`}>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-lg font-bold text-[#10273F]">{item.dayOfWeek.charAt(0) + item.dayOfWeek.slice(1).toLowerCase()}</h3>
                                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                                    {item.active ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#54708A]">
                                                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#0EA394]" />{formatTime(item.startTime)} – {formatTime(item.endTime)}</span>
                                                <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[#0EA394]" />{item.maxPatientsAllowed} patients</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.active && (
                                                <button type="button" onClick={() => startEditing(item)} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#DCEDEF] px-4 text-sm font-semibold text-[#385574] hover:bg-[#F2F9FA]"><Pencil className="h-4 w-4" />Edit</button>
                                            )}
                                            <button type="button" onClick={() => void changeActiveState(item)} className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-4 text-sm font-semibold ${item.active ? "border-red-200 text-red-600 hover:bg-red-50" : "border-[#9EDDD7] text-[#0B7F73] hover:bg-[#E3F6F4]"}`}>
                                                {item.active ? <Power className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
                                                {item.active ? "Deactivate" : "Reactivate"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
