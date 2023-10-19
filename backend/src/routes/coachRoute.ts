import { Router } from "express";
import { getCoaches } from "../controllers/coachController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, getCoaches);
export default router;
