import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin, isProspect } from "../middlewares/authorization";
import {
  createCohortController,
  decisionController,
  getApplicationFormController,
  getCohortController,
  getCohortsController,
  getMyApplicationController,
  updateCohortController,
} from "../controllers/cohortControllers";

const router = Router();

router.get("/application", verifyJWT, isAdmin, getApplicationFormController);
router.get("/my-application", verifyJWT, isProspect, getMyApplicationController);
router.get("/", verifyJWT, isAdmin, getCohortsController);
router.get("/:cohortId", verifyJWT, isAdmin, getCohortController);

router.post("/", verifyJWT, isAdmin, createCohortController);

router.patch("/decision", verifyJWT, isAdmin, decisionController);
router.patch("/:cohortId", verifyJWT, isAdmin, updateCohortController);

export default router;
