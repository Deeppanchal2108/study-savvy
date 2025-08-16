import { Request, Response } from "express";
import prisma from "../utils/prisma";
import axios from "axios";

export const createCourse = async (req: Request, res: Response) => {
    const { title, description, experience, knowledge, difficulty } = req.body;

console.log("HERE IS RQ BODY :", req.body)
  
        const result = await axios.get(`${process.env.FASTAPI_BACKEND}/courses`, {
            params: {
                title,
                description,
                experience,
                knowledge,
                difficulty, // ✅ added
            },
        });

        console.log("FastAPI response:", result.data);

        

    
};
