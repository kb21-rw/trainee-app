import { Router } from "express";
import {
  createForm,
  getForms,
  updateForm,
  getSingleForm,
  deleteForm,
} from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/", verifyJWT, isAdmin, createForm);
router.get("/", verifyJWT, getForms);
router.get("/:formId", verifyJWT, getSingleForm);
router.patch("/:formId", verifyJWT, isAdmin, updateForm);
router.delete("/:formId", verifyJWT, isAdmin, deleteForm);
export default router;
