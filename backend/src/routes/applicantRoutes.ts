import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import { decision, getApplicants } from "../controllers/applicantControllers";

const router = Router();

router.get("/", verifyJWT, isAdmin, getApplicants)
router.patch("/decision", verifyJWT, isAdmin, decision);

export default router;
