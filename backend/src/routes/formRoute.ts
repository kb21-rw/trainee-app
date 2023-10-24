import { Router } from "express";
import { createForm, getForms } from "../controllers/formContoller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/", verifyJWT, createForm);
router.get("/", verifyJWT, getForms);
export default router;
