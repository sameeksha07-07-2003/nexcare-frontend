// src/pages/PatientProfilePage.jsx
//
// This used to be a second, separate implementation of the profile page,
// which is why it fell out of sync with src/components/profile/PatientProfilePage.jsx
// (missing the "My Profile" heading, Edit button, Security card, and correct
// backend field mapping). To avoid maintaining two copies, this file now just
// re-exports the real implementation.
export { default } from "../components/profile/PatientProfilePage";