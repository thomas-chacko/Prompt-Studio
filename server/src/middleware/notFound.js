import createError from "../utils/createError.js";

const notFound = (req, _res, next) => {
  next(createError(404, `Route not found: ${req.originalUrl}`));
};

export default notFound;
