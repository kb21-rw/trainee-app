import { Router } from "express";
import { verifyJWT } from "../middlewares/authenticate";
import { isAdminOrCoach } from "../middlewares/authorization";
import { getMyTraineeOverview, getOverview } from "../controllers/overviewControllers";

const router = Router();

router.get("/", verifyJWT, isAdminOrCoach, getOverview);

router.get("/my-trainees", verifyJWT, isAdminOrCoach, getMyTraineeOverview);

export default router;
