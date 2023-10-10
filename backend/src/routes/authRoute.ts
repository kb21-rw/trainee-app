import { Router } from "express";
import {
  login,
  register,
  getUserProfile,
  assignCoach,
  get_coaches,
  get_trainees,
  updateUserProfile,
  deleteUser,
  reset_password,
  editUser,
  get_users,
  editTrainee,
  get_my_trainees,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.post("/register", verifyJWT, register);
router.post("/login", login);
router.get("/trainees", verifyJWT, get_trainees);
router.get("/my-trainees", verifyJWT, get_my_trainees);
router.get("/coaches", verifyJWT, get_coaches);
router.get("/users", verifyJWT, get_users);
router.patch("/assign-coach/:id", verifyJWT, assignCoach);
router.put("/edit-user/:id", verifyJWT, editUser);
router.put("/edit-trainee/:id", verifyJWT, editTrainee);
router.post("/reset-password", reset_password);
router.get("/profile", verifyJWT, getUserProfile);
router.put("/profile", verifyJWT, updateUserProfile);

router.delete("/users/:userId", deleteUser);

export default router;
