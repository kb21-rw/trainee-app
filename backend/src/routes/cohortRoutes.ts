import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import {
  createCohortController,
  decision,
  getApplicationFormController,
  getCohortsController,
} from "../controllers/cohortControllers";

const router = Router();

router.get("/application", verifyJWT, getApplicationFormController);
router.get("/", verifyJWT, getCohortsController);

router.post("/", verifyJWT, isAdmin, createCohortController);

router.patch("/decision", verifyJWT, isAdmin, decision);

export default router;
