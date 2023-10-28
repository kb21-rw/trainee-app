import { Router } from "express";
import {
  createForm,
  deleteForm,
  getForms,
  updateForm,
} from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/", verifyJWT, isAdmin, createForm);
router.get("/", verifyJWT, getForms);
router.patch("/:formId", verifyJWT, isAdmin, updateForm);
router.delete("/:formId", verifyJWT, isAdmin, deleteForm);
export default router;
