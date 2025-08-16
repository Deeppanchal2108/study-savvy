import { Router } from "express";

import { createCourse } from "./course.controller";
const router = Router()

router.post("/create-course", 
    (req, res, next) => {
        console.log("Hit /create-course route");
        return createCourse(req, res);
    }
)

export const courseRouter = router;