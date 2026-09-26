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

// Uploads a new profile photo. Backend stores it on Cloudinary and returns
// the updated profile (including photoUrl).
//
// axiosClient.js sets a default header of Content-Type: application/json
// for every request. That default "wins" even for FormData bodies unless we
// explicitly clear it here — otherwise axios never gets to set its own
// multipart boundary, and the backend rejects the request with
// "Content-Type 'application/json' is not supported".
export async function uploadPatientProfilePhoto(file) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axiosClient.post('/patient/profile/photo', formData, {
    headers: { 'Content-Type': undefined },
  })
  return data // expected shape: full profile object, including photoUrl
}