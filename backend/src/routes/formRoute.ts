import { Router } from "express";
import {
  createFormController,
  getFormsController,
  updateFormController,
  getSingleFormController,
  deleteFormController,
} from "../controllers/formController";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.get("/", verifyJWT, isAdmin, getFormsController);
router.get("/:formId", verifyJWT, isAdmin, getSingleFormController);

router.post("/", verifyJWT, isAdmin, createFormController);
router.patch("/:formId", verifyJWT, isAdmin, updateFormController);
router.delete("/:formId", verifyJWT, isAdmin, deleteFormController);

export default router;
