import { Router } from "express";
import { getCoaches, updateCoachOrAdmin} from "../controllers/coachController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, getCoaches);
router.patch("/edit-coach-or-admin/:id", verifyJWT, updateCoachOrAdmin);
export default router;
