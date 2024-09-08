// Error handling middleware (errorMiddleware.js)
const notFound = (req, res, next) => {
  res.status(404); // Corrected 'staus' to 'status'
  next(new Error(`Not Found - ${req.originalUrl}`));
};


const errorHandler = (err, req, res, next) => {
  let statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  res.status(statuscode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
