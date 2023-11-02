import { Router } from "express";
import {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  updateQuestion,
} from "../controllers/questionController";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/:formId", verifyJWT, isAdmin, createQuestion);
router.get("/", verifyJWT, isAdmin, getAllQuestions);
router.patch("/:questionId", verifyJWT, isAdmin, updateQuestion);
router.delete("/:questionId", verifyJWT, isAdmin, deleteQuestion);

export default router;
