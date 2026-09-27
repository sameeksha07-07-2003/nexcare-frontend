import {
    Camera,
    CircleAlert,
    Clock3,
    LoaderCircle,
    Save,
    ShieldCheck,
    Stethoscope,
} from "lucide-react"
import { useState } from "react"

import {
    updateMyDoctorProfile,
    uploadDoctorProfilePhoto,
} from "../api/doctorApi"
import Avatar from "../components/common/Avatar"
import { useProfile } from "../context/ProfileContext"

const STATUS_STYLES = {
    APPROVED: {
        icon: ShieldCheck,
        title: "Profile approved",
        message: "Your profile is visible to patients and can receive appointments.",
        className: "border-emerald-200 bg-emerald-50 text-emerald-800",
    },
    PENDING: {
        icon: Clock3,
        title: "Verification pending",
        message: "Our team is reviewing your professional information. You can keep your profile updated while you wait.",
        className: "border-amber-200 bg-amber-50 text-amber-800",
    },
    REJECTED: {
        icon: CircleAlert,
        title: "Profile needs attention",
        message: "Review your professional details and contact support before requesting verification again.",
        className: "border-red-200 bg-red-50 text-red-800",
    },
}

function InputField({ label, name, value, onChange, type = "text", required = false, min, max, step }) {
    return (
        <label className="block">
            <span className="text-sm font-semibold text-[#10273F]">
                {label}{required ? " *" : ""}
            </span>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                required={required}
                min={min}
                max={max}
                step={step}
                className="mt-2 w-full rounded-xl border border-[#DCEDEF] bg-white px-4 py-3 text-sm text-[#10273F] outline-none transition focus:border-[#0EA394] focus:ring-2 focus:ring-[#0EA394]/15"
            />
        </label>
    )
}

function DoctorProfileForm({ profile, onProfileRefresh }) {
    const [form, setForm] = useState({
        phoneNumber: profile.phone || "",
        primaryQualification: profile.primaryQualification || "",
        additionalQualification: profile.additionalQualification || "",
        specialization: profile.specialization || "",
        yearOfPassing: profile.yearOfPassing || "",
        placeOfWork: profile.placeOfWork || "",
        city: profile.city || "",
        yearsOfExperience: profile.yearsOfExperience ?? "",
        bio: profile.bio || "",
        consultationFee: profile.consultationFee ?? "",
    })
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const status = STATUS_STYLES[profile.verificationStatus] || STATUS_STYLES.PENDING
    const StatusIcon = status.icon

    function handleChange(event) {
        const { name, value } = event.target
        setForm((current) => ({ ...current, [name]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setSaving(true)
        setError("")
        setSuccess("")

        try {
            await updateMyDoctorProfile({
                ...form,
                yearOfPassing: Number(form.yearOfPassing),
                yearsOfExperience: Number(form.yearsOfExperience),
                consultationFee:
                    form.consultationFee === ""
                        ? null
                        : Number(form.consultationFee),
                additionalQualification:
                    form.additionalQualification.trim() || null,
                bio: form.bio.trim() || null,
            })
            await onProfileRefresh()
            setSuccess("Profile updated successfully.")
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                "We could not update your profile.",
            )
        } finally {
            setSaving(false)
        }
    }

    async function handlePhotoChange(event) {
        const file = event.target.files?.[0]
        event.target.value = ""
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.")
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Profile image must be smaller than 5 MB.")
            return
        }

        setUploading(true)
        setError("")
        setSuccess("")
        try {
            await uploadDoctorProfilePhoto(file)
            await onProfileRefresh()
            setSuccess("Profile photo updated successfully.")
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                requestError?.message ||
                "We could not upload your profile photo.",
            )
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="mx-auto max-w-6xl">
            <header>
                <h1 className="text-3xl font-bold tracking-tight text-[#071E4A] sm:text-4xl">
                    Doctor Profile
                </h1>
                <p className="mt-2 text-sm text-[#52709B] sm:text-base">
                    Keep your professional information accurate and review your verification status.
                </p>
            </header>

            <div className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 ${status.className}`}>
                <StatusIcon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <div>
                    <p className="font-bold">{status.title}</p>
                    <p className="mt-1 text-sm leading-6">{status.message}</p>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="h-fit rounded-2xl border border-[#DCEDEF] bg-white p-6 text-center shadow-[0_10px_35px_rgba(16,39,63,0.05)]">
                    <Avatar
                        photoUrl={profile.avatarUrl}
                        role="DOCTOR"
                        name={profile.fullName}
                        size="xl"
                    />
                    <h2 className="mt-4 text-xl font-bold text-[#10273F]">
                        Dr. {profile.fullName}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-[#0B8F90]">
                        {profile.specialization || "Doctor"}
                    </p>
                    <label className="mt-5 inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#0EA394] px-4 text-sm font-semibold text-[#0B7F73] transition hover:bg-[#E3F6F4]">
                        {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                        {uploading ? "Uploading..." : "Change photo"}
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="sr-only"
                            disabled={uploading}
                            onChange={handlePhotoChange}
                        />
                    </label>

                    <dl className="mt-6 space-y-4 border-t border-[#EEF4F6] pt-5 text-left text-sm">
                        <div>
                            <dt className="text-[#54708A]">Registration number</dt>
                            <dd className="mt-1 font-semibold text-[#10273F]">{profile.medicalRegistrationNumber || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-[#54708A]">Medical council</dt>
                            <dd className="mt-1 font-semibold text-[#10273F]">{profile.medicalCouncil || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-[#54708A]">Email</dt>
                            <dd className="mt-1 break-all font-semibold text-[#10273F]">{profile.email}</dd>
                        </div>
                    </dl>
                </aside>

                <form onSubmit={handleSubmit} className="rounded-2xl border border-[#DCEDEF] bg-white p-5 shadow-[0_10px_35px_rgba(16,39,63,0.05)] sm:p-7">
                    <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E3F6F4] text-[#0EA394]">
                            <Stethoscope className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-[#10273F]">Professional information</h2>
                            <p className="text-sm text-[#54708A]">Fields marked with * are required.</p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <InputField label="Phone number" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
                        <InputField label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} required />
                        <InputField label="Primary qualification" name="primaryQualification" value={form.primaryQualification} onChange={handleChange} required />
                        <InputField label="Additional qualification" name="additionalQualification" value={form.additionalQualification} onChange={handleChange} />
                        <InputField label="Year of passing" name="yearOfPassing" type="number" min="1950" max="2100" value={form.yearOfPassing} onChange={handleChange} required />
                        <InputField label="Years of experience" name="yearsOfExperience" type="number" min="0" max="80" value={form.yearsOfExperience} onChange={handleChange} required />
                        <InputField label="Hospital or clinic" name="placeOfWork" value={form.placeOfWork} onChange={handleChange} required />
                        <InputField label="City" name="city" value={form.city} onChange={handleChange} required />
                        <InputField label="Consultation fee (₹)" name="consultationFee" type="number" min="0" step="0.01" value={form.consultationFee} onChange={handleChange} />
                    </div>

                    <label className="mt-5 block">
                        <span className="text-sm font-semibold text-[#10273F]">Professional bio</span>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            maxLength={2000}
                            rows={5}
                            className="mt-2 w-full resize-y rounded-xl border border-[#DCEDEF] px-4 py-3 text-sm text-[#10273F] outline-none focus:border-[#0EA394] focus:ring-2 focus:ring-[#0EA394]/15"
                        />
                        <span className="mt-1 block text-right text-xs text-[#54708A]">{form.bio.length}/2000</span>
                    </label>

                    {error && <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
                    {success && <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</p>}

                    <div className="mt-6 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#0EA394] px-6 text-sm font-semibold text-white transition hover:bg-[#0B7F73] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {saving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default function DoctorProfilePage() {
    const { profile, status, error, loadProfile } = useProfile()

    if (status === "loading" || status === "idle") {
        return (
            <div className="flex min-h-[55vh] items-center justify-center text-[#54708A]">
                <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-[#0EA394]" />
                Loading doctor profile...
            </div>
        )
    }

    if (status === "error" || !profile) {
        return (
            <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white p-8 text-center">
                <CircleAlert className="mx-auto h-10 w-10 text-red-500" />
                <h1 className="mt-4 text-xl font-bold text-[#10273F]">Unable to load profile</h1>
                <p className="mt-2 text-sm text-[#54708A]">{error}</p>
                <button type="button" onClick={() => void loadProfile()} className="mt-5 rounded-xl bg-[#0EA394] px-5 py-3 text-sm font-semibold text-white">
                    Try again
                </button>
            </div>
        )
    }

    return (
        <DoctorProfileForm
            key={`${profile.email}-${profile.avatarUrl || "no-photo"}`}
            profile={profile}
            onProfileRefresh={loadProfile}
        />
    )
}
