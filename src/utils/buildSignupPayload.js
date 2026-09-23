// Turns the flat form values into the nested JSON body that POST /auth/signup expects.
// Only fields listed here can ever leave the browser (an allow-list), so values like
// confirmPassword, or the other role's fields, are never sent.

// Trim text; leave numbers and other types alone. Never used on passwords.
function text(value) {
  return typeof value === "string" ? value.trim() : value;
}

// Number inputs give strings. Blank or invalid input becomes undefined ("not provided").
function toNumber(value) {
  const trimmed = text(value);
  if (trimmed === "" || trimmed === undefined || trimmed === null) return undefined;
  const number = Number(trimmed);
  return Number.isFinite(number) ? number : undefined;
}

// Optional fields: trim strings, then drop anything blank so we never send "" to the server.
function omitEmpty(fields) {
  const result = {};
  for (const [key, raw] of Object.entries(fields)) {
    const value = text(raw);
    if (value !== "" && value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result;
}

function buildPatientProfile(values) {
  return omitEmpty({
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,
    bloodGroup: values.bloodGroup,
    address: values.address,
    emergencyContact: values.emergencyContact,
    height: toNumber(values.height),
    weight: toNumber(values.weight),
  });
}

function buildDoctorProfile(values) {
  return omitEmpty({
    medicalRegistrationNumber: values.medicalRegistrationNumber,
    medicalCouncil: values.medicalCouncil,
    registrationDate: values.registrationDate,
    primaryQualification: values.primaryQualification,
    additionalQualification: values.additionalQualification,
    specialization: values.specialization,
    yearOfPassing: toNumber(values.yearOfPassing),
    placeOfWork: values.placeOfWork,
  });
}

export function buildSignupPayload(values) {
  const base = {
    firstName: text(values.firstName),
    lastName: text(values.lastName),
    email: text(values.email),
    phoneNumber: text(values.phoneNumber),
    password: values.password, // never trimmed: spaces may be intentional
    role: values.role,
  };

  if (values.role === "PATIENT") {
    return { ...base, patientProfile: buildPatientProfile(values) };
  }
  if (values.role === "DOCTOR") {
    return { ...base, doctorProfile: buildDoctorProfile(values) };
  }
  throw new Error(`Unsupported role: ${values.role}`);
}