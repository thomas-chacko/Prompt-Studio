/**
 * Wraps async route handlers to forward errors to Express error middleware.
 * Eliminates try/catch boilerplate in every controller.
 *
 * @param {Function} fn - Async route handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
