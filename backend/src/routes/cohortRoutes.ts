import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import {
  createCohortController,
  decision,
  getApplicationFormController,
  getCohortController,
  getCohortsController,
  updateCohortController,
} from "../controllers/cohortControllers";

const router = Router();

router.get("/application", verifyJWT, getApplicationFormController);
router.get("/", verifyJWT, getCohortsController);
router.get("/:cohortId", verifyJWT, getCohortController);

router.post("/", verifyJWT, isAdmin, createCohortController);

router.patch("/:cohortId", verifyJWT, isAdmin, updateCohortController);
router.patch("/decision", verifyJWT, isAdmin, decision);

export default router;
