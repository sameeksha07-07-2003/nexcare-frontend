function trimText(value) {
  return typeof value === "string" ? value.trim() : value;
}

function optionalText(value) {
  const trimmed = trimText(value);

  return trimmed === "" ||
    trimmed === null ||
    trimmed === undefined
    ? undefined
    : trimmed;
}

function requiredNumber(value, fieldName) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(
      `${fieldName} must be a valid number.`,
    );
  }

  return number;
}

function optionalNumber(value) {
  if (
    value === "" ||
    value === null ||
    value === undefined
  ) {
    return undefined;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : undefined;
}

function removeUndefined(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== undefined,
    ),
  );
}

function buildPatientProfile(values) {
  return removeUndefined({
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,

    bloodGroup: optionalText(
      values.bloodGroup,
    ),

    address: optionalText(
      values.address,
    ),

    emergencyContact: optionalText(
      values.emergencyContact,
    ),

    height: optionalNumber(
      values.height,
    ),

    weight: optionalNumber(
      values.weight,
    ),
  });
}

function buildDoctorProfile(values) {
  return removeUndefined({
    medicalRegistrationNumber: trimText(
      values.medicalRegistrationNumber,
    ),

    medicalCouncil: trimText(
      values.medicalCouncil,
    ),

    registrationDate:
      values.registrationDate,

    primaryQualification: trimText(
      values.primaryQualification,
    ),

    additionalQualification: optionalText(
      values.additionalQualification,
    ),

    specialization: trimText(
      values.specialization,
    ),

    yearOfPassing: requiredNumber(
      values.yearOfPassing,
      "Year of passing",
    ),

    placeOfWork: trimText(
      values.placeOfWork,
    ),

    city: trimText(
      values.city,
    ),

    yearsOfExperience: requiredNumber(
      values.yearsOfExperience,
      "Years of experience",
    ),

    consultationFee: requiredNumber(
      values.consultationFee,
      "Consultation fee",
    ),
  });
}

export function buildSignupPayload(values) {
  const account = {
    firstName: trimText(
      values.firstName,
    ),

    lastName: trimText(
      values.lastName,
    ),

    email: trimText(
      values.email,
    ).toLowerCase(),

    phoneNumber: trimText(
      values.phoneNumber,
    ),

    // Never trim passwords.
    // Spaces may be intentional characters.
    password: values.password,

    role: values.role,
  };

  if (values.role === "PATIENT") {
    return {
      ...account,

      patientProfile:
        buildPatientProfile(values),
    };
  }

  if (values.role === "DOCTOR") {
    return {
      ...account,

      doctorProfile:
        buildDoctorProfile(values),
    };
  }

  throw new Error(
    "Please choose a valid account type.",
  );
}