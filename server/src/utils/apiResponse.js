/**
 * Standardised JSON response helpers.
 * All controllers must use these — never call res.json() directly.
 */

export const sendSuccess = (res, data = {}, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data });
};

export const sendPaginated = (res, data = [], meta = {}) => {
  res.status(200).json({ success: true, data, meta });
};
