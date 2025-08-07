import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";
import { Response, Request } from "express";
const router = Router()

router.post("/signup", registerUser)

router.post("/login", loginUser)

export const authRouter = router;
