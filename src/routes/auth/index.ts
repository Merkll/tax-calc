import { SignUpController, LoginController } from "@controllers/auth";
import asyncWrapper from "@helpers/asyncWrapper";
import validator from "@utils/validator";
import { signupVerificationSchema } from '../../validations/auth';


/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *         - token
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 *         token:
 *           type: string
 */

export default (router) => {
 /**
 * @swagger
 *
 * /signup:
 *   post:
 *     description: Sign up a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 *       
 */
  router.post("/signup", validator(signupVerificationSchema), asyncWrapper(SignUpController));

  /**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 *       
 */
  router.post("/login", validator(signupVerificationSchema), asyncWrapper(LoginController));
  
  return router;
};
