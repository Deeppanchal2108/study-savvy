import { Request, Response } from "express"
import prisma from "../utils/prisma"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/jwt";



const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;



    if (!firstName || !email || !password) {
        return res
            .status(400)
            .json({ error: "First name, email, and password are required." });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });

        return res
            .status(201)
            .json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Email and password are required." });
    }

    try {
        const userExist = await prisma.user.findUnique({
            where: { email },
        });

        if (!userExist) {
            return res
                .status(400)
                .json({ error: "User does not exist. Please sign up." });
        }

        const isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ error: "Password doesn’t match. Please try again." });
        }

        const token = generateToken(userExist.id);

        return res.status(200).json({
            token,
            message: "Login successful",
            user: {
                id: userExist.id,
                firstName: userExist.firstName,
                lastName: userExist.lastName,
                email: userExist.email

                
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
