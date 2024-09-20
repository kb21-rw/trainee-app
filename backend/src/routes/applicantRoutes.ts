import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdmin } from "../middlewares/authorization";
import { getApplicants } from "../controllers/applicantControllers";

const router = Router();

router.get("/", verifyJWT, isAdmin, getApplicants)

export default router;
