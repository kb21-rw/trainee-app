import { Router } from "express";
import {
  createFormController,
  getFormsController,
  updateFormController,
  getSingleFormController,
  deleteFormController,
  getApplicationFormController,
} from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.get("/", verifyJWT, isAdmin, getFormsController);
router.get("/application", verifyJWT, getApplicationFormController);
router.get("/:formId", verifyJWT, isAdmin, getSingleFormController);

router.post("/", verifyJWT, isAdmin, createFormController);
router.patch("/:formId", verifyJWT, isAdmin, updateFormController);
router.delete("/:formId", verifyJWT, isAdmin, deleteFormController);

export default router;
