import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdminOrCoach } from "../middlewares/authorization";
import { getOverview } from "../controllers/overviewControllers";

const router = Router();

router.get("/", verifyJWT, isAdminOrCoach, getOverview);

export default router;
