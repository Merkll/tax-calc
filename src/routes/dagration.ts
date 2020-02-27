import { AddDagrationRecord, GetDagrationRecord, CalculateTax } from "@controllers/dagration";
import asyncWrapper from "@helpers/asyncWrapper";

export default (router) => {
  router.post("/dagration", asyncWrapper(AddDagrationRecord));
  router.get("/dagration", asyncWrapper(GetDagrationRecord));
  router.get("/calculate", asyncWrapper(CalculateTax));

  return router;
};
