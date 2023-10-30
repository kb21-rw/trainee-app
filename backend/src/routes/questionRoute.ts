import { Router } from "express";
import {
  createQuestion,
  getAllQuestions,
} from "../controllers/questionController";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/:formId", verifyJWT, isAdmin, createQuestion);
router.get("/", verifyJWT, isAdmin, getAllQuestions);

export default router;
