import { useEffect, useRef, useState } from "react";
import { Mail, Phone, Camera, Loader2 } from "lucide-react";
import Avatar from "../common/Avatar";
import PhotoCropModal from "../common/PhotoCropModal";
import { uploadPatientProfilePhoto } from "../../api/patientApi";
import { useProfile } from "../../context/ProfileContext";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

export default function ProfileHero({ profile }) {
  const {
    fullName,
    role = "Patient",
    email,
    phone,
    isActive = true,
    avatarUrl,
    genderRaw,
  } = profile || {};

  const { setAvatarUrl, loadProfile } = useProfile();

  const fileInputRef = useRef(null);
  const isMountedRef = useRef(true);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);

  useEffect(() => {
     isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  function handlePickPhoto() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError("File size must be less than 50MB.");
      return;
    }

    setUploadError(null);
    setCropImageSrc(URL.createObjectURL(file));
  }

  function closeCropModal() {
    if (cropImageSrc) URL.revokeObjectURL(cropImageSrc);
    setCropImageSrc(null);
  }

  async function handleCropConfirm(croppedBlob) {
    closeCropModal();
    try {
      setUploading(true);
      setUploadError(null);
      const croppedFile = new File([croppedBlob], "profile-photo.jpg", { type: "image/jpeg" });
      const { photoUrl } = await uploadPatientProfilePhoto(croppedFile);
      if (isMountedRef.current) setAvatarUrl(photoUrl);
    } catch (err) {
      const isTimeout = err.code === "ECONNABORTED" || /timeout/i.test(err.message || "");

      if (isTimeout) {
        // The request gave up client-side, but the backend may well have
        // finished the upload anyway (it has its own 20s cap). Re-fetch the
        // real profile after a short delay so the UI self-corrects instead
        // of requiring the user to manually refresh.
        if (isMountedRef.current) {
          setUploadError("This is taking longer than usual — checking if it went through...");
        }
        setTimeout(() => {
          if (isMountedRef.current) {
            loadProfile();
            setUploadError(null);
          }
        }, 4000);
      } else if (isMountedRef.current) {
        setUploadError(getUploadErrorMessage(err));
      }
    } finally {
      if (isMountedRef.current) setUploading(false);
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

      {cropImageSrc && (
        <PhotoCropModal
          imageSrc={cropImageSrc}
          onCancel={closeCropModal}
          onConfirm={handleCropConfirm}
        />
      )}
    </div>
  );
}

function getUploadErrorMessage(err) {
  const status = err?.response?.status;
  const serverMessage = err?.response?.data?.message;

  if (status === 413) return "File size must be less than 50MB.";
  if (status === 401 || status === 403) return "Your session has expired. Please log in again.";
  if (!err?.response) return "Couldn't reach the server. Check your connection and try again.";
  
  return serverMessage
    ? `Upload failed: ${serverMessage}`
    : "Upload failed on the server. Please try again.";
}
