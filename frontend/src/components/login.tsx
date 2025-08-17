import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner"

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    message: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        const credentials: LoginPayload = {
            email, password
        }

        try {
            const { data } = await axios.post<LoginResponse>(
                `${API_BASE_URL}/api/auth/login`,
                credentials
            );
            localStorage.setItem("token", data.token);
            // Show success
            toast.success(data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    "Login failed. Please try again.";
                toast.error(errorMessage);
            } else {
                toast.error("Something went wrong. Please try again.");
                console.error(error);
            }
        }

        setEmail("")
        setPassword("")
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
            <div className="w-full max-w-md bg-card border-4 border-foreground shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-foreground font-mono">Login</h2>
                <div className="space-y-6">
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
                        className="w-full py-3 font-bold text-lg bg-foreground
                         text-primary-foreground border-2 border-foreground shadow-md hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0px] active:shadow-sm transition-all duration-150"
                    >
                        Login
                    </button>
                </div>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                    No account?{' '}
                    <a
                        href="/signup"
                        className="text-primary font-bold hover:underline hover:text-primary/80 transition-colors"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;