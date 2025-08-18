import { Router } from "express";

import { createCourse, getCourseById, getTopicById , getAllCoursesOfUser } from "./course.controller";
const router = Router()

router.post("/create-course", createCourse
)


router.post("/getCourse",getCourseById
)




router.post("/getTopic", getTopicById
)


router.post("/getCourses", getAllCoursesOfUser
)
export const courseRouter = router;