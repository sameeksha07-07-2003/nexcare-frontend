// src/api/patientApi.js
import axiosClient from './axiosClient'

export async function getPatientProfile() {
  const { data } = await axiosClient.get('/patient/profile')
  return data
}

export async function updatePatientProfile(payload) {
  const { data } = await axiosClient.put('/patient/profile', payload)
  return data
}

// Step 1 of the direct-upload flow: ask our backend for a short-lived,
// signed permission slip. This call is tiny (just JSON), so it's fast
// even when the network is otherwise slow.
async function getCloudinaryUploadSignature() {
  const { data } = await axiosClient.get('/patient/profile/photo-upload-signature')
  return data // { signature, timestamp, apiKey, cloudName, folder }
}

// Step 3: tell our backend the final Cloudinary URL so it gets saved.
// Also tiny (just JSON) — no file bytes touch our backend at all.
async function confirmPhotoUpload(uploadResult) {
  const { data } = await axiosClient.put('/patient/profile/photo', {
    secureUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    version: uploadResult.version,
    signature: uploadResult.signature,
  })
  return data
}

// Uploads a profile photo DIRECTLY from the browser to Cloudinary
// (bypassing our backend for the actual file bytes), then saves just the
// resulting URL. This avoids the slow double-hop (browser -> our server ->
// Cloudinary -> our server -> browser) and typically finishes in a few
// seconds instead of tens of seconds.
export async function uploadPatientProfilePhoto(file) {
  const {
    signature,
    timestamp,
    apiKey,
    folder,
    publicId,
    overwrite,
    invalidate,
    uploadUrl,
  } =
    await getCloudinaryUploadSignature()

  const cloudinaryForm = new FormData()
  cloudinaryForm.append('file', file)
  cloudinaryForm.append('api_key', apiKey)
  cloudinaryForm.append('timestamp', timestamp)
  cloudinaryForm.append('signature', signature)
  cloudinaryForm.append('folder', folder)
  cloudinaryForm.append('public_id', publicId)
  cloudinaryForm.append('overwrite', String(overwrite))
  cloudinaryForm.append('invalidate', String(invalidate))

  // Plain fetch — NOT axiosClient — because this goes straight to
  // Cloudinary's servers, not ours, and must never carry our JWT.
  const cloudinaryResponse = await fetch(
    uploadUrl,
    { method: 'POST', body: cloudinaryForm }
  )

  if (!cloudinaryResponse.ok) {
    throw new Error('Cloudinary upload failed. Please try again.')
  }

  const cloudinaryData = await cloudinaryResponse.json()
  const updatedProfile = await confirmPhotoUpload(cloudinaryData)
  return { photoUrl: updatedProfile.photoUrl }
}
