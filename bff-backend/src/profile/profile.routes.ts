import { Router } from "express";
import { getUser, editSkills , editUser } from "./profile.controller";

const router = Router()



router.post("/get", getUser);

router.put("/skills", editSkills);

router.put("/edit", editUser);



export const profileRouter = router;