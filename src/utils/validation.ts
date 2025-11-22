/**
 * Validation Utilities
 * Pure functions for form validation
 * Easily testable and reusable across the app
 */

interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface RegistrationFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ValidationErrors = Record<string, string>;

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
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
 */
export const validatePassword = (
  password: string,
  minLength: number = 8
): ValidationResult => {
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
 */
export const validateUsername = (
  username: string,
  minLength: number = 3
): ValidationResult => {
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
 */
export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }

  return { isValid: true, error: null };
};

/**
 * Validate login form
 */
export const validateLoginForm = ({
  email,
  password,
}: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }

  return errors;
};

/**
 * Validate registration form
 */
export const validateRegistrationForm = ({
  username,
  email,
  password,
  confirmPassword,
}: RegistrationFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  const usernameValidation = validateUsername(username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error!;
  }

  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error!;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error!;
  }

  if (password && confirmPassword) {
    const matchValidation = validatePasswordsMatch(password, confirmPassword);
    if (!matchValidation.isValid) {
      errors.confirmPassword = matchValidation.error!;
    }
  }

  return errors;
};

/**
 * Check if validation errors object is empty
 */
export const isValidForm = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};
