import { Router } from "express";
import { login, register, getUserProfile,assignCoach, get_coaches, get_trainees, updateUserProfile } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

router.post("/register", verifyJWT,register)
router.post("/login", login)
router.get("/trainees",verifyJWT, get_trainees)
router.get("/coaches",verifyJWT, get_coaches)
router.patch("/assign-coach/:id",verifyJWT, assignCoach)

router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

export default router