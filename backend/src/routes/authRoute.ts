import { Router } from "express";
import { login, register} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/authenticate";


const router = Router()

// router.post("/register", register)
router.post("/register", verifyJWT,register)
router.post("/login", login)


export default router