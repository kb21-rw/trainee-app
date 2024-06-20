import { Router } from "express";
import { applicantRegister, login, register, resetPassword } from "../controllers/authController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

// Applicant
router.post("/register/applicant", applicantRegister);

export default router;
