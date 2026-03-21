/**
 * Global error handling utilities
 * Standardizes error messages and logging
 */

export interface AppError {
  message: string
  statusCode?: number
  field?: string
}

/**
 * Extract user-friendly error message from various error types
 */
export const extractErrorMessage = (error: unknown): string => {
  // Axios error with response
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any
    return axiosError.response?.data?.message || axiosError.message || 'An error occurred'
  }

  // Standard Error object
  if (error instanceof Error) {
    return error.message
  }

  // String error
  if (typeof error === 'string') {
    return error
  }

  // Unknown error type
  return 'An unexpected error occurred'
}

/**
 * Map HTTP status codes to user-friendly messages
 */
export const getStatusMessage = (statusCode: number): string => {
  const messages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please login.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    409: 'This resource already exists.',
    422: 'Invalid data provided.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    503: 'Service temporarily unavailable.',
  }

  return messages[statusCode] || 'An error occurred'
}

/**
 * Log error to console in development
 */
export const logError = (error: unknown, context?: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error)
  }
}

/**
 * Create a standardized error object
 */
export const createAppError = (
  message: string,
  statusCode?: number,
  field?: string
): AppError => {
  return { message, statusCode, field }
}

/**
 * Handle API errors with proper logging and message extraction
 */
export const handleApiError = (error: unknown, context?: string): AppError => {
  logError(error, context)
  
  const message = extractErrorMessage(error)
  const statusCode = (error as any)?.response?.status
  
  return createAppError(message, statusCode)
}
