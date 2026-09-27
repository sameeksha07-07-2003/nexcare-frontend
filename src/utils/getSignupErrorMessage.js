const NESTED_FIELD_PREFIX =
  /^(patientProfile|doctorProfile)\./;

function normalizeFieldName(fieldName) {
  return String(fieldName || "").replace(
    NESTED_FIELD_PREFIX,
    "",
  );
}

export function getSignupErrorMessage(
  error,
) {
  if (!error?.response) {
    return {
      message:
        "Cannot reach the server. Check your connection and try again.",

      fieldErrors: {},
    };
  }

  const data = error.response.data;

  const validationErrors =
    data?.validationErrors;

  const fieldErrors = {};

  if (
    validationErrors &&
    typeof validationErrors === "object"
  ) {
    Object.entries(
      validationErrors,
    ).forEach(
      ([fieldName, message]) => {
        fieldErrors[
          normalizeFieldName(fieldName)
        ] = String(message);
      },
    );
  }

  const hasFieldErrors =
    Object.keys(fieldErrors).length > 0;

  if (error.response.status === 409) {
    return {
      message:
        data?.message ||
        "An account with these details already exists.",

      fieldErrors,
    };
  }

  return {
    message: hasFieldErrors
      ? "Please correct the highlighted fields."
      : data?.message ||
        "We could not create your account. Please try again.",

    fieldErrors,
  };
}