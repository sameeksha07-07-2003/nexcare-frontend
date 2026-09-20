export function getSignupErrorMessage(error) {
  if (!error.response) {
    return {
      message: "Cannot reach the server. Please check your connection and try again.",
      fieldErrors: {},
    };
  }

  const data = error.response.data;
  const rawMessage = (data && data.message) || "Something went wrong. Please try again.";

  const fieldErrors = {};
  const fieldErrorPattern = /field '([^']+)'.*?default message \[([^\]]+)\]/g;

  let match;
  while ((match = fieldErrorPattern.exec(rawMessage)) !== null) {
    const fieldName = match[1];
    const fieldMessage = match[2];
    fieldErrors[fieldName] = fieldMessage;
  }

  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  return {
    message: hasFieldErrors ? "Please fix the highlighted fields." : rawMessage,
    fieldErrors,
  };
}