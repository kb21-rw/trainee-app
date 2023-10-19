import { Router } from "express";
import {
  getTrainees,
  getTraineesForCoach,
  updateTrainee,
} from "../controllers/traineeController";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();
router.get("/all", verifyJWT, getTrainees);
router.get("/my-trainees", verifyJWT, getTraineesForCoach);
router.patch("/:id", verifyJWT, updateTrainee);
export default router;
