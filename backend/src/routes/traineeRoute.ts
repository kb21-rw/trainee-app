import { Router } from "express";
import {
  get_trainees,
  update_trainee,
  get_my_trainees,
} from "../controllers/trainee.controller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();
router.get("/all", verifyJWT, get_trainees);
router.get("/my-trainees", verifyJWT, get_my_trainees);
router.patch("/:id", verifyJWT, update_trainee);
export default router;
