import { Router } from "express";
import { login, register, resetPassword } from "../controllers/authController";
import { verifyJWT } from "../middlewares/authenticate";
import passport from "passport";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRATION, secret } from "../constants";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.post("/reset-password", resetPassword);

// Applicant

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    // User authenticated successfully
    const user: any = req.user;

    // Generate a JWT
    const accessToken = jwt.sign(
      { id: user!.id, email: user!.email, name: user.name, role: user.role },
      secret,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    // Send the JWT to the frontend
    res.json({ accessToken });
  }
);

export default router;
