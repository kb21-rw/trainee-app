import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import { createCohortController } from "../controllers/cohortControllers";

const router = Router();

router.post("/", verifyJWT, isAdmin, createCohortController);
export default router;
