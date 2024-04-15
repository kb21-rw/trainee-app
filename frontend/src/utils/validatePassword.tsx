export const uppercaseRegex = /[A-Z]/;
export const lowercaseRegex = /[a-z]/;
export const digitRegex = /\d/;
export const specialCharRegex = /[^\w\s]/;
export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validatePassword = (value: string) => {
  if (!value) {
    return "Password is required"; // Early return for empty password
  }

  if (value.length < 8) {
    return "Password must be at least 8 characters long";
  }

  if (!uppercaseRegex.test(value)) {
    return "Password must contain an uppercase letter";
  }

  if (!lowercaseRegex.test(value)) {
    return "Password must contain a lowercase letter";
  }

  if (!digitRegex.test(value)) {
    return "Password must contain a number";
  }

  if (!specialCharRegex.test(value)) {
    return "Password must contain a special character";
  }

  return false; // Password is valid
};

export default validatePassword;
