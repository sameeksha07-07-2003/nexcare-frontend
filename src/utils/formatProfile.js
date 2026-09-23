// src/utils/formatProfile.js

// "FEMALE" -> "Female", "MALE" -> "Male", "OTHER" -> "Other"
export function formatGender(gender) {
  if (!gender) return "Not provided";
  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
}

// "O_POSITIVE" -> "O+", "AB_NEGATIVE" -> "AB-"
const BLOOD_GROUP_MAP = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
};

export function formatBloodGroup(bloodGroup) {
  if (!bloodGroup) return "Not provided";
  return BLOOD_GROUP_MAP[bloodGroup] || bloodGroup;
}

// "2001-03-15" -> "15 Mar 2001"
export function formatDate(dateString) {
  if (!dateString) return "Not provided";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Not provided";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// backend gives firstName + lastName separately, UI needs one string
export function formatFullName(firstName, lastName) {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();
  return name || "Not provided";
}

export function formatPhone(phoneNumber) {
  return phoneNumber || "Not provided";
}

export function formatText(value) {
  return value || "Not provided";
}

export function formatHeight(height) {
  return height ? `${height} cm` : "Not provided";
}

export function formatWeight(weight) {
  return weight ? `${weight} kg` : "Not provided";
}