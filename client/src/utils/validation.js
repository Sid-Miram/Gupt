import isStrongPassword from "validator/es/lib/isStrongPassword";
import isEmail from "validator/es/lib/isEmail";

// signup validation

export const validateSignup = ({ email, username, password }) => {
  if (!username) return "Please enter a username";
  if (!email) return "Please enter an email";
  if (!isEmail(email)) return "Please enter a valid email";
  if (!password) return "Please enter a password";
  if (!isStrongPassword(password)) return "Please enter a strong password.";
  return null; // No validation errors
};



// login validation

export const validateLogin = ({email, password }) => {
  if (!email) return "Please enter an email";
  if(!isEmail(email)) return "Please enter a valid email";
  if(!password) return "Please enter the password";

  return null // No validation errors
}

