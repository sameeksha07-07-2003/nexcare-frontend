import { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { X, ZoomIn } from "lucide-react";
import { getCroppedImageBlob } from "../../utils/cropImage";

/**
 * PhotoCropModal — circular drag-to-pan + pinch/slider-to-zoom crop UI.
 *
 * Props:
 * - imageSrc: object URL of the selected file
 * - onCancel(): called when the user backs out without saving
 * - onConfirm(blob): called with the cropped image as a Blob (image/jpeg)
 */
export default function PhotoCropModal({ imageSrc, onCancel, onConfirm }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const onCropComplete = useCallback((_croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // Close on Escape — standard modal accessibility expectation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  async function handleSave() {
    if (!croppedAreaPixels || saving) return;
    try {
      setSaving(true);
      setError(null);
      const blob = await getCroppedImageBlob(imageSrc, croppedAreaPixels);
      onConfirm(blob);
    } catch {
      setError("Could not process this image. Please try a different photo.");
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Adjust profile photo"
    >
      <div className="w-full max-w-[380px] rounded-[16px] bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#10273F]">Adjust your photo</h2>
          <button
            type="button"
            aria-label="Cancel"
            onClick={onCancel}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Responsive square crop frame: shrinks on very narrow screens */}
        <div className="relative mx-auto h-[min(280px,60vw)] w-[min(280px,60vw)] overflow-hidden rounded-full bg-[#F2F9FA]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            restrictPosition={true}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ZoomIn size={16} className="shrink-0 text-[#54708A]" aria-hidden="true" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-[#04949D]"
            aria-label="Zoom"
          />
        </div>

        {error && <p className="mt-3 text-[12px] font-medium text-red-600">{error}</p>}

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex-1 rounded-[10px] border border-[#DCEDEF] px-4 py-[10px] text-[14px] font-semibold text-[#10273F] transition-colors hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!croppedAreaPixels || saving}
            className="flex-1 rounded-[10px] bg-[#04949D] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors hover:bg-[#037A82] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
