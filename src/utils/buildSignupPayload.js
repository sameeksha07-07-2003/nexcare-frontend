function cleanObject(obj) {
  const result = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== "" && value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

export function buildSignupPayload(formValues) {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role,
    gender,
    dateOfBirth,
    bloodGroup,
    address,
    emergencyContact,
    height,
    weight,
    medicalRegistrationNumber,
    medicalCouncil,
    registrationDate,
    primaryQualification,
    additionalQualification,
    specialization,
    yearOfPassing,
    placeOfWork,
  } = formValues;

  const payload = {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    role,
  };

  if (role === "PATIENT") {
    payload.patientProfile = cleanObject({
      gender,
      dateOfBirth,
      bloodGroup,
      address,
      emergencyContact,
      height: height === "" ? "" : Number(height),
      weight: weight === "" ? "" : Number(weight),
    });
  }

  if (role === "DOCTOR") {
    payload.doctorProfile = cleanObject({
      medicalRegistrationNumber,
      medicalCouncil,
      registrationDate,
      primaryQualification,
      additionalQualification,
      specialization,
      yearOfPassing: yearOfPassing === "" ? "" : Number(yearOfPassing),
      placeOfWork,
    });
  }

  return payload;
}