import { Router } from "express";
import {
  get_profile,
  update_profile,
  delete_user,
  update_user,
  get_users,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/authenticate";

const router = Router();

router.get("/all", verifyJWT, get_users);
router.patch("/edit-coach-or-admin/:id", verifyJWT, update_user);
router.get("/my-profile", verifyJWT, get_profile);
router.patch("/my-profile", verifyJWT, update_profile);
router.delete("/:userId", delete_user);

export default router;
