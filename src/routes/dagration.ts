import { AddDagrationRecord, GetDagrationRecord, CalculateTax } from "@controllers/dagration";
import asyncWrapper from "@helpers/asyncWrapper";

/**
 * @swagger
 *
 * definitions:
 *   NewDagration:
 *     type: object
 *     required:
 *       - amount
 *       - order
 *       - rate
 *     properties:
 *       amount:
 *         type: number
 *       order:
 *         type: number
 *       rate:
 *         type: number
*   Tax:
 *     type: object
 *     required:
 *       - tax
 *     properties:
 *       tax:
 *         type: number
 *   Dagrations:
 *     allOf:
 *       - $ref: '#/definitions/NewDagration'
 */


export default (router) => {
  /**
 * @swagger
 *
 * /dagration:
 *   post:
 *     description: Adds dagration to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         type: string
 *         default: Bearer {token}
 *       - name: amount
 *         description: Amount of the dagration.
 *         in: body
 *         required: false
 *         type: string
 *       - name: order
 *         description: The order in which to apply the dagration.
 *         in: body
 *         required: true
 *         type: string
 *       - name: rate
 *         description: The rate at which the dagration is calculated
 *         in: body
 *         type: boolean
 *         required: false
 *       - name: force
 *         description: Specifies whether to overwrite a dagration. A bulk insert overwrites by default
 *         in: query
 *         type: string
 *         required: false
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Dagrations'
 *       
 */
  router.post("/dagration", asyncWrapper(AddDagrationRecord));

  /**
 * @swagger
 *
 * /dagration:
 *   get:
 *     description: Fetch all gradations
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        type: string
 *        default: Bearer {token}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Dagrations'
 * 
 */
  router.get("/dagration", asyncWrapper(GetDagrationRecord));

 /**
 * @swagger
 *
 * /calculate:
 *   get:
 *     description: calculates tax by appling gradations in order
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        required: true
 *        type: string
 *        default: Bearer {token}
 *      - name: amount
 *        in: query
 *        required: true
 *        type: number
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Tax'
 */
  router.get("/calculate", asyncWrapper(CalculateTax));

  return router;
};
