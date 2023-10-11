import { Router } from "express";
import {
  login,
  register,
  reset_password,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.post("/reset-password", reset_password);

export default router;
