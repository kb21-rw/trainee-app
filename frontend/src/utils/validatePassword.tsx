const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;
const specialCharRegex = /[^\w\s]/;

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

  return true; // Password is valid
};

export default validatePassword;
