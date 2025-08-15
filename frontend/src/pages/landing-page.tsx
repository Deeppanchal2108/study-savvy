import { useNavigate } from "react-router-dom";

export function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-background)] text-[var(--color-foreground)] font-sans">
            <h1 className="text-4xl font-bold mb-4">Welcome to Study Savvy</h1>
            <p className="mb-8 text-lg text-[var(--color-muted-foreground)] max-w-lg text-center">
                Organize your learning, track progress, and stay motivated with Study
                Savvy.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/login")}
                    className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 transition"
                >
                    Login
                </button>

                <button
                    onClick={() => navigate("/signup")}
                    className="px-6 py-3 rounded-lg bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] hover:opacity-90 transition"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
}
