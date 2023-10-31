import { Router } from "express";
import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/questionController";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/:formId", verifyJWT, isAdmin, createQuestion);
router.patch("/:questionId", verifyJWT, isAdmin, updateQuestion);
router.delete("/:questionId", verifyJWT, isAdmin, deleteQuestion);

export default router;
