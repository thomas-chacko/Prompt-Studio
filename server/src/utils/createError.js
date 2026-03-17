/**
 * Factory for operational HTTP errors.
 * @param {number} statusCode - HTTP status code
 * @param {string} message    - Human-readable error message
 */
const createError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

export default createError;
