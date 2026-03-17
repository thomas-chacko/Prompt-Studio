/**
 * Centralised environment config.
 * All process.env access should go through here — never read process.env directly in feature code.
 */

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
