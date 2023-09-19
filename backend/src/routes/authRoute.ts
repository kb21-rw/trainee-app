import { Router } from "express";
import { get_coaches, get_trainees, login, register} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

router.post("/register", verifyJWT,register)
router.post("/login", login)
router.get("/trainees",verifyJWT, get_trainees)
router.get("/coaches",verifyJWT, get_coaches)


export default router