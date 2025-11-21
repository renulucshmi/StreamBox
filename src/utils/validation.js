/**
 * Validation Utilities
 * Pure functions for form validation
 * Easily testable and reusable across the app
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {Object} Validation result with isValid and error message
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Enter a valid email address" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate password
 * @param {string} password - Password to validate
 * @param {number} minLength - Minimum password length (default: 8)
 * @returns {Object} Validation result with isValid and error message
 */
export const validatePassword = (password, minLength = 8) => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @param {number} minLength - Minimum username length (default: 3)
 * @returns {Object} Validation result with isValid and error message
 */
export const validateUsername = (username, minLength = 3) => {
  if (!username || !username.trim()) {
    return { isValid: false, error: "Username is required" };
  }

  if (username.trim().length < minLength) {
    return {
      isValid: false,
      error: `Username must be at least ${minLength} characters`,
    };
  }

  // Check for valid characters (alphanumeric and underscore)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      error: "Username can only contain letters, numbers, and underscores",
    };
  }

  return { isValid: true, error: null };
};

/**
 * Validate passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {Object} Validation result with isValid and error message
 */
export const validatePasswordsMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate login form
 * @param {Object} formData - Form data to validate
 * @param {string} formData.email - Email field
 * @param {string} formData.password - Password field
 * @returns {Object} Validation errors object
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  return errors;
};

/**
 * Validate registration form
 * @param {Object} formData - Form data to validate
 * @param {string} formData.username - Username field
 * @param {string} formData.email - Email field
 * @param {string} formData.password - Password field
 * @param {string} formData.confirmPassword - Confirm password field
 * @returns {Object} Validation errors object
 */
export const validateRegistrationForm = ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }

  if (password && confirmPassword) {
    const matchValidation = validatePasswordsMatch(password, confirmPassword);
    if (!matchValidation.isValid) {
      errors.confirmPassword = matchValidation.error;
    }
  }

  return errors;
};

/**
 * Check if validation errors object is empty
 * @param {Object} errors - Errors object
 * @returns {boolean} True if no errors
 */
export const isValidForm = (errors) => {
  return Object.keys(errors).length === 0;
};
