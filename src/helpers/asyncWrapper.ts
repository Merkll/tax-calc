declare const debug;

export default (wrappedFunction) => async (request, response, next) => {
  try {
    const { data = {}, message = 'Request sucessfull', status = 200, success = true } = await wrappedFunction(request, response, next);

    response.status(status).json({ success, message, data })
  } catch (error) {
    debug(error);
    return next(error);
  }
};