exports.errorHandler = (message, status, code) => {
  const err = new Error(message);
  err.status = status || "error";
  err.statusCode = code || 500;
  return err;
};
