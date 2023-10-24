import { Router } from "express";
import { login, register, resetPassword } from "../controllers/authController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

export default router;
