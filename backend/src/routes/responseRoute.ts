import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdminOrCoach, isApplicant } from "../middlewares/authorization";
import { createApplicantResponse, createCoachResponse } from "../controllers/responseController";

const router = Router();

router.put("/:questionId?", verifyJWT, isAdminOrCoach, createCoachResponse);
router.post("/application", verifyJWT, isApplicant, createApplicantResponse);

export default router;
