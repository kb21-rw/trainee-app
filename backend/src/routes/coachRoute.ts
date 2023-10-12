import { Router } from "express";
import { get_coaches } from "../controllers/coachController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, get_coaches);
export default router;
