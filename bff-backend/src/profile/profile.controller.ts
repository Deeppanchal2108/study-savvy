import { Request, Response } from "express";
import prisma from "../utils/prisma";
import axios from "axios";


export const getUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body  

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                courses: true, 
            },
        })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const editSkills = async (req: Request, res: Response) => {
    try {
         
        const { skills  , userId} = req.body;  

        if (!Array.isArray(skills)) {
            return res.status(400).json({ error: "Skills must be an array of strings" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                skills: {
                    set: skills, // replaces the whole array
                },
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                skills: true,
            },
        });

        return res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update skills" });
    }
};




export const editUser = async (req: Request, res: Response) => {
    try {
       
        const { firstName, lastName, email, password, imageUrl , userId} = req.body;

        const data: any = {};

        if (firstName !== undefined) data.firstName = firstName;
        if (lastName !== undefined) data.lastName = lastName;
        if (email !== undefined) data.email = email;
        if (password !== undefined) data.password = password; 
        if (imageUrl !== undefined) data.imageUrl = imageUrl;


        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                skills: true,
                imageUrl: true,
                createdAt: true,
            },
        });

        return res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update user" });
    }
};
