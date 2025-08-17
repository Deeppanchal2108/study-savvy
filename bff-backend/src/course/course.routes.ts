import { Router } from "express";

import { createCourse, getCourseById, getTopicById } from "./course.controller";
const router = Router()

router.post("/create-course", createCourse
)


router.post("/getCourse",getCourseById
)




router.post("/getTopic", getTopicById
)
export const courseRouter = router;