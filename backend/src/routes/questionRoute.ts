import { Router } from "express";
import { createQuestion } from "../controllers/questionController";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/:formId", verifyJWT, isAdmin, createQuestion);

export default router;
