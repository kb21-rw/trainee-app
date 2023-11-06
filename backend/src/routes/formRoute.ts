import { Router } from "express";
import {
  createForm,
  getFormsController,
  updateFormController,
  getSingleForm,
  deleteForm,
} from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/", verifyJWT, isAdmin, createForm);
router.get("/", verifyJWT, getFormsController);
router.get("/:formId", verifyJWT, getSingleForm);
router.patch("/:formId", verifyJWT, isAdmin, updateFormController);
router.delete("/:formId", verifyJWT, isAdmin, deleteForm);
export default router;
