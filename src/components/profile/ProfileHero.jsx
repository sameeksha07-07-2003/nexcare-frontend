import React, { useRef, useState } from "react";
import { Mail, Phone, Camera, Loader2 } from "lucide-react";
import Avatar from "../common/Avatar";
import { uploadPatientProfilePhoto } from "../../api/patientApi";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

/**
 * ProfileHero — gradient identity card, with a click-to-upload avatar.
 * Pass onAvatarUploaded(url) so the parent (via ProfileContext) can sync
 * the new photo everywhere it's shown (this card + the Topbar).
 */
export default function ProfileHero({ profile, onAvatarUploaded }) {
  const {
    fullName,
    role = "Patient",
    email,
    phone,
    isActive = true,
    avatarUrl,
    genderRaw,
  } = profile || {};

  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  function handlePickPhoto() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    // --- Client-side validation: caught before any network call ---
    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError("File size must be less than 50MB.");
      return;
    }

    try {
      setUploading(true);
      setUploadError(null);
      const { photoUrl } = await uploadPatientProfilePhoto(file);
      onAvatarUploaded?.(photoUrl);
    } catch (err) {
      setUploadError(getUploadErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div
      className="mb-4 flex flex-col gap-4 rounded-[14px] border border-[#D5EFEC] p-4 shadow-[0_4px_16px_rgba(16,39,63,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-5 md:p-6"
      style={{ background: "linear-gradient(135deg, #F0FCFB, #E3F6F4)" }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative shrink-0">
          <Avatar photoUrl={avatarUrl} gender={genderRaw} name={fullName} size="xl" />

          <button
            type="button"
            onClick={handlePickPhoto}
            disabled={uploading}
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#04949D] text-white shadow-sm transition-colors hover:bg-[#037A82] disabled:opacity-70"
          >
            {uploading ? (
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            ) : (
              <Camera size={13} aria-hidden="true" />
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-[19px] font-bold text-[#10273F] sm:text-[22px] md:text-[24px]">
              {fullName || "Not provided"}
            </h1>
            <span className="shrink-0 rounded-full bg-[#E3F6F4] px-3 py-[2px] text-[12px] font-semibold text-[#0EA394]">
              {role}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#54708A] sm:text-[13px]">
            <span className="flex items-center gap-1.5">
              <Mail size={14} aria-hidden="true" className="shrink-0" />
              <span className="truncate">{email || "Not provided"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={14} aria-hidden="true" className="shrink-0" />
              {phone || "Not provided"}
            </span>
          </div>
          {uploadError && (
            <p className="mt-1 text-[12px] font-medium text-red-600">{uploadError}</p>
          )}
        </div>
      </div>

      {isActive && (
        <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-[#DDF7EA] px-3 py-1 text-[13px] font-semibold text-[#219653]">
          <span className="h-[7px] w-[7px] rounded-full bg-[#219653]" />
          Active
        </span>
      )}
    </div>
  );
}

// Turns a failed upload request into a message that tells the user WHY it
// failed, instead of one generic "try again" for every case.
function getUploadErrorMessage(err) {
  const status = err?.response?.status;
  const serverMessage = err?.response?.data?.message;

  if (status === 413) {
    // Backend/servlet rejected it for being too large (spring.servlet.multipart limits)
    return "File size must be less than 50MB.";
  }
  if (status === 401 || status === 403) {
    return "Your session has expired. Please log in again.";
  }
  if (!err?.response) {
    // Request never reached the server (network down, backend not running, CORS block, etc.)
    return "Couldn't reach the server. Check your connection and try again.";
  }
  // Any other server-side failure (500s, Cloudinary errors, etc.)
  return serverMessage
    ? `Upload failed: ${serverMessage}`
    : "Upload failed on the server. Please try again.";
}