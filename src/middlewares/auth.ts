import { verifyToken } from '@helpers/auth';
import { AuthenticationError } from '@helpers/errors';

export const authenticateUser = async (request, response, next) => {
  let  { authorization } = request.headers

  if (!authorization) return next(AuthenticationError());

  authorization = authorization.split(' ');

  const token = authorization.length == 1 ? authorization[0] : authorization[1];

  console.log(token);

  if (!token) return next(AuthenticationError());

  try {
    const { valid, userId } = await verifyToken(token);

    if (valid) {
      request.user = { userId };
      return next()
    }
    
  } catch (error) {}
  
  return next(AuthenticationError())
};
