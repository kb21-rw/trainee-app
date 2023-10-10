import { Router } from "express";
import { getUserProfile,assignCoach, get_coaches, get_trainees, updateUserProfile, deleteUser, editUser, get_users, editTrainee, get_my_trainees } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

router.get("/trainees",verifyJWT, get_trainees)
router.get("/my-trainees",verifyJWT, get_my_trainees)
router.get("/coaches",verifyJWT, get_coaches)
router.get("/all",verifyJWT, get_users)
router.patch("/assign-coach/:id",verifyJWT, assignCoach)
router.put("/edit-coach-or-admin/:id", verifyJWT, editUser)
router.put("/edit-trainee/:id", verifyJWT, editTrainee)
router.get("/my-profile", verifyJWT, getUserProfile);
router.put("/my-profile", verifyJWT, updateUserProfile); 
router.delete('/:userId', deleteUser);

export default router