import { Router } from "express";
import { createForm, getForms } from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";

const router = Router();

router.post("/", verifyJWT, isAdmin, createForm);
router.get("/", verifyJWT, getForms);
export default router;
