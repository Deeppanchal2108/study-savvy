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

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        const credentials: LoginPayload = {
            email, password
        }

        try {
            
            const { data } = await axios.post<LoginResponse>(`${API_BASE_URL}/auth/login`, credentials)
            localStorage.setItem('token', data.token);
            toast(data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast('Login failed:', error.response?.data);
            }
            
        }

    
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    No account?{' '}
                    <a href="/signup" className="text-primary hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
