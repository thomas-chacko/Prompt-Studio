/**
 * Client-side validation utilities
 * All validation rules centralized here
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Email validation
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email is required" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid email format" }
  }

  return { isValid: true }
}

/**
 * Password validation
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Password is required" }
  }

  if (password.length < 8) {
    return { isValid: false, error: "Password must be at least 8 characters" }
  }

  if (password.length > 128) {
    return { isValid: false, error: "Password must be less than 128 characters" }
  }

  // Check for at least one letter and one number
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, error: "Password must contain at least one letter" }
  }

  if (!/\d/.test(password)) {
    return { isValid: false, error: "Password must contain at least one number" }
  }

  return { isValid: true }
}

/**
 * Username validation
 */
export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { isValid: false, error: "Username is required" }
  }

  if (username.length < 3) {
    return { isValid: false, error: "Username must be at least 3 characters" }
  }

  if (username.length > 32) {
    return { isValid: false, error: "Username must be less than 32 characters" }
  }

  // Only alphanumeric and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: "Username can only contain letters, numbers, and underscores" }
  }

  return { isValid: true }
}

/**
 * Password confirmation validation
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" }
  }

  return { isValid: true }
}
