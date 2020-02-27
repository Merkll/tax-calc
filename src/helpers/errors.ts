import { SchemaErrorCheckResult } from "@interfaces/validation";

type errorType = string | {[key: string]: string};

/**
 * Base error class for application
 *
 * @class
 *
 * @extends Error
 */
export class ApplicationError extends Error {
  /**
   * @description initialises the error
   *
   * @param {number} status - status code;
   * @param {string} message - Error message
   * @param {Array} errors - an array of errors
   */
  public status: number;
  public errors: errorType[] | SchemaErrorCheckResult;
  public success: boolean;
  constructor(status, message: string = 'an error occured', errors?: errorType[] | SchemaErrorCheckResult) {
    super(message);
    this.status = status || 500;
    this.message = message;
    this.errors = errors;
    this.success = false;
  }
}

export const NotFoundError = (message: string = 'Resource does not exist'): ApplicationError => {
  return new ApplicationError(404, message);
};

export const AppError = (status: number, message:string): ApplicationError => {
 return new ApplicationError(status, message);
};

export const ValidationError = (errors: errorType[] | SchemaErrorCheckResult) => {
  return new ApplicationError(409, "Error occured in fields validation", errors);
}

export const UserExistError = (username) => {
  return new ApplicationError(422, `User with username ${username} already exists`);
}

export const UnAuthorizedError = () => {
  return new ApplicationError(403, `Username or password not correct`);
}

export const AuthenticationError = () => {
  return new ApplicationError(403, `YOu are not authenticated, please login`);
}

