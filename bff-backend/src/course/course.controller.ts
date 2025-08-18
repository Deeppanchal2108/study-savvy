import { Request, Response } from "express";
import prisma from "../utils/prisma";
import axios from "axios";

export const createCourse = async (req: Request, res: Response) => {
    const { title, description, experience, knowledge, difficulty ,userId } = req.body;

    try {
        const result = await axios.get(`${process.env.FASTAPI_BACKEND}/courses`, {
            params: { title, description, experience, knowledge, difficulty },
        });

        const courseData = result.data.course; 
        const courseJson = JSON.parse(courseData); 


        const createdCourse = await prisma.course.create({
            data: {
                title: courseJson.title,
                duration: courseJson.duration,
                userId,
                topics: {
                    create: courseJson.topics.map((topic: any) => ({
                        title: topic.title,
                        pages: {
                            create: topic.pages.map((page: any) => ({
                                title: page.title,
                                content: page.content,
                                viewed: page.viewed ?? false,
                            })),
                        },
                        quizzes: {
                            create: topic.quizzes.map((quiz: any) => ({
                                question: quiz.question,
                                options: quiz.options,
                                answer: quiz.answer,
                                score: quiz.score ?? null,
                            })),
                        },
                        flashcards: {
                            create: topic.flashcards.map((flash: any) => ({
                                front: flash.front,
                                back: flash.back,
                            })),
                        },
                        summary: topic.summary
                            ? { create: { content: topic.summary.content, completed: topic.summary.completed ?? false } }
                            : undefined,
                    })),
                },
            },
            include: {
                topics: {
                    include: {
                        pages: true,
                        quizzes: true,
                        flashcards: true,
                        summary: true,
                    },
                },
            },
        });

        console.log("Course created successfully:", createdCourse);

        res.status(201).json({ message: "Course created successfully", course: createdCourse });
    } catch (error: any) {
        console.error("Error creating course:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getCourseById = async (req: Request, res: Response) => {
    const { id, userId } = req.body;

    try {
        const course = await prisma.course.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                topics: true, 
            },
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getTopicById = async (req: Request, res: Response) => {
    const { topicId, userId } = req.body;

    if (!topicId || !userId) {
        return res.status(400).json({ message: "topicId and userId are required" });
    }

    try {
        const topic = await prisma.topic.findFirst({
            where: {
                id: topicId,
                course: {
                    userId: userId, // ensure topic belongs to the user's course
                },
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                pages: true,
                quizzes: true,
                flashcards: true,
                summary: true,
            },
        });

        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }

        res.status(200).json(topic);
    } catch (error) {
        console.error("Error fetching topic:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllCoursesOfUser = async (req: Request, res: Response) => {
    const { userId } = req.body; // or req.params / req.query depending on route design

    try {
        const courses = await prisma.course.findMany({
            where: { userId },
        });

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found for this user" });
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const updateTopicCompletion = async (req: Request, res: Response) => {
    const { topicId, completed } = req.body;

    if (!topicId || completed === undefined) {
        return res.status(400).json({ message: "topicId and completed are required" });
    }

    try {
        // 1️⃣ Update topic completion status
        const updatedTopic = await prisma.topic.update({
            where: { id: topicId },
            data: { completed },
            include: { course: true }, // include course relation to get courseId
        });

        const courseId = updatedTopic.courseId;

        // 2️⃣ Fetch all topics of the course
        const courseTopics = await prisma.topic.findMany({
            where: { courseId },
            select: { completed: true },
        });

        // 3️⃣ Check if every topic is completed
        const allCompleted = courseTopics.every(t => t.completed);

        // 4️⃣ Update course completion accordingly
        await prisma.course.update({
            where: { id: courseId },
            data: { completed: allCompleted },
        });

        return res.status(200).json({
            ...updatedTopic,
            courseCompleted: allCompleted,
        });
    } catch (error) {
        console.error("Error updating topic completion:", error);
        return res.status(500).json({ message: "Failed to update topic completion" });
    }
};
