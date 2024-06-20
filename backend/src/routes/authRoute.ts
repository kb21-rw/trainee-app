import { Router } from "express";
import { applicantRegister, login, register, resetPassword, verifyApplicant } from "../controllers/authController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

// Applicant
router.post("/register/applicant", applicantRegister);
router.patch("/applicant/verify", verifyApplicant);

export default router;
