import { Router } from "express";
import { signup } from "../controllers/applicantController";
import { signin } from "../controllers/applicantController";
const router = Router();

router.post("/signup", signup);

router.post("/signin", signin);
// router.patch("/reset/:userId", signin);

export default router;
