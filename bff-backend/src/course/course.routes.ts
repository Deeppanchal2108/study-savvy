import { Router } from "express";

import { createCourse, getCourseById, getTopicById , getAllCoursesOfUser, updateTopicCompletion } from "./course.controller";
const router = Router()

router.post("/create-course", createCourse
)


router.post("/getCourse",getCourseById
)




router.post("/getTopic", getTopicById
)


router.post("/getCourses", getAllCoursesOfUser
)


router.post("/updateTopicCompletion",updateTopicCompletion)
export const courseRouter = router;