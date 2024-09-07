const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.staus(404);
  next(error);
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
