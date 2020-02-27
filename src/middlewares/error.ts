declare const debug;

export default (err, request, response, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  let errorMessage = {};

  if (response.headersSent) {
    return next(err);
  }

  if (!isProduction) {
    debug(err.stack);
    errorMessage = err;
  }

  return response.status(err.status || 500).json({
    status: 'error',
    success: false,
    message: err.message,
    ...(err.errors && { errors: err.errors }),
    error: {
      message: err.message,
      ...(!isProduction && { trace: errorMessage })
    }
  });
};
