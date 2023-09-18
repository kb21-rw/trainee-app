import { Router } from "express";
import { register} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

router.post("/register", register)

// router.post("/register", verifyJWT,register)

export default router