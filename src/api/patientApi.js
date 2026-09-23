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