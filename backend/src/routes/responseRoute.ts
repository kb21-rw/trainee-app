import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdminOrCoach, isApplicant } from "../middlewares/authorization";
import { createApplicantResponse, createResponse } from "../controllers/responseController";

const router = Router();

router.put("/:questionId?", verifyJWT, isAdminOrCoach, createResponse);
router.post("/application", verifyJWT, isApplicant, createApplicantResponse);

export default router;
