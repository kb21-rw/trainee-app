import { Router } from "express";
import { signup } from "../controllers/applicantController";

const router = Router();

router.post("/signup", signup);

export default router;
