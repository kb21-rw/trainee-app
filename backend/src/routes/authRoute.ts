import { Router } from "express";
import { assignCoach, login, register} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

router.post("/register", verifyJWT,register)
router.post("/login", login)
router.patch("/assign-coach/:id",verifyJWT, assignCoach)


export default router