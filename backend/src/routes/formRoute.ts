import { Router } from "express";
import {
  createFormController,
  getFormsController,
  updateFormController,
  getSingleFormController,
  deleteFormController,
} from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/", verifyJWT, isAdmin, createFormController);
router.get("/", verifyJWT, getFormsController);
router.get("/:formId", verifyJWT, getSingleFormController);
router.patch("/:formId", verifyJWT, isAdmin, updateFormController);
router.delete("/:formId", verifyJWT, isAdmin, deleteFormController);
export default router;
