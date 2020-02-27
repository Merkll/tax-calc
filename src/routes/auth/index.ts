import { SignUpController, LoginController } from "@controllers/auth";
import asyncWrapper from "@helpers/asyncWrapper";
import validator from "@utils/validator";
import { signupVerificationSchema } from '../../validations/auth';

export default (router) => {
  router.post("/signup", validator(signupVerificationSchema), asyncWrapper(SignUpController));
  router.post("/login", validator(signupVerificationSchema), asyncWrapper(LoginController));
  
  return router;
};
