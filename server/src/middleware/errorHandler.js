import { NODE_ENV } from "../config/env.js";

/**
 * Global error handler — must be registered LAST in app.js.
 * Catches anything passed via next(err).
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[error] ${statusCode} — ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
