import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";

interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface SignupResponse {
    message: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: SignupPayload = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            const { data } = await axios.post<SignupResponse>(
                `${API_BASE_URL}/api/auth/signup`,
                newUser
            );

            toast(data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(`Signup failed: ${error.response?.data?.error || 'Unknown error'}`);
            }
        }

        setFirstName("")
        setEmail("")
        setPassword("")
        setLastName("")
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block mb-1 font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block mb-1 font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-md font-medium bg-primary text-white hover:opacity-90 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
