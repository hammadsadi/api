const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  return res.status(statusCode).json({ message: error.message });
};

// Export
export default errorHandler;
