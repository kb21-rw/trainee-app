import { Router } from "express";
import { get_coaches } from "../controllers/coach.controller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, get_coaches);
export default router;
