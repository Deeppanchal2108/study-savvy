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
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
            <div className="w-full max-w-md bg-card border-4 border-foreground shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-foreground font-mono">Sign Up</h2>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block mb-2 font-bold text-foreground">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="w-full border-2 border-foreground p-3 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none shadow-sm transition-all"
                            placeholder="Enter your first name"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block mb-2 font-bold text-foreground">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="w-full border-2 border-foreground p-3 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none shadow-sm transition-all"
                            placeholder="Enter your last name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block mb-2 font-bold text-foreground">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border-2 border-foreground p-3 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none shadow-sm transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 font-bold text-foreground">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border-2 border-foreground p-3 bg-input text-foreground placeholder:text-muted-foreground focus:outline-none shadow-sm transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full py-3 font-bold text-lg bg-primary text-primary-foreground border-2 border-foreground shadow-md hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-sm transition-all duration-150"
                    >
                        Sign Up
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a
                        href="/login"
                        className="text-primary font-bold hover:underline hover:text-primary/80 transition-colors"
                    >
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;