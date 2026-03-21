import { describe, it, expect } from 'vitest';
import {
  extractErrorMessage,
  getStatusMessage,
  createAppError,
  handleApiError,
} from '../error-handler';

describe('Error Handler Utils', () => {
  describe('extractErrorMessage', () => {
    it('should extract message from axios error', () => {
      const axiosError = {
        response: {
          data: {
            message: 'Invalid credentials',
          },
        },
      };
      expect(extractErrorMessage(axiosError)).toBe('Invalid credentials');
    });

    it('should extract message from Error object', () => {
      const error = new Error('Something went wrong');
      expect(extractErrorMessage(error)).toBe('Something went wrong');
    });

    it('should handle string errors', () => {
      expect(extractErrorMessage('Error string')).toBe('Error string');
    });

    it('should handle unknown error types', () => {
      expect(extractErrorMessage(null)).toBe('An unexpected error occurred');
      expect(extractErrorMessage(undefined)).toBe('An unexpected error occurred');
      expect(extractErrorMessage(123)).toBe('An unexpected error occurred');
    });
  });

  describe('getStatusMessage', () => {
    it('should return correct message for known status codes', () => {
      expect(getStatusMessage(400)).toBe('Invalid request. Please check your input.');
      expect(getStatusMessage(401)).toBe('Authentication required. Please login.');
      expect(getStatusMessage(403)).toBe('You do not have permission to perform this action.');
      expect(getStatusMessage(404)).toBe('The requested resource was not found.');
      expect(getStatusMessage(409)).toBe('This resource already exists.');
      expect(getStatusMessage(429)).toBe('Too many requests. Please try again later.');
      expect(getStatusMessage(500)).toBe('Server error. Please try again later.');
    });

    it('should return generic message for unknown status codes', () => {
      expect(getStatusMessage(418)).toBe('An error occurred');
      expect(getStatusMessage(999)).toBe('An error occurred');
    });
  });

  describe('createAppError', () => {
    it('should create error with all fields', () => {
      const error = createAppError('Test error', 400, 'email');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.field).toBe('email');
    });

    it('should create error with only message', () => {
      const error = createAppError('Test error');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBeUndefined();
      expect(error.field).toBeUndefined();
    });
  });

  describe('handleApiError', () => {
    it('should handle axios error with status code', () => {
      const axiosError = {
        response: {
          status: 401,
          data: {
            message: 'Unauthorized',
          },
        },
      };
      const result = handleApiError(axiosError, 'Login');
      expect(result.message).toBe('Unauthorized');
      expect(result.statusCode).toBe(401);
    });

    it('should handle generic Error', () => {
      const error = new Error('Network error');
      const result = handleApiError(error);
      expect(result.message).toBe('Network error');
    });
  });
});
