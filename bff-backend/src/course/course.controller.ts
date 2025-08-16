import { Request, Response } from "express";
import prisma from "../utils/prisma";
import axios from "axios";

export const createCourse = async (req: Request, res: Response) => {
    const { title, description, experience, knowledge, difficulty } = req.body;

    try {
        const result = await axios.get(`${process.env.FASTAPI_BACKEND}/courses`, {
            params: { title, description, experience, knowledge, difficulty },
        });

        const courseData = result.data.course; 
        const courseJson = JSON.parse(courseData); 

        const userId = "cmed9n2vy0000bqd4g0t5ea2t";

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
