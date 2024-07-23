import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import { decision } from "../controllers/applicantControllers";

const router = Router();

router.patch("/decision", verifyJWT, isAdmin, decision);

export default router;
