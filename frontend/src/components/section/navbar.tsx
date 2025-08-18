import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "@/lib/auth"

function Navbar() {
    const navigate = useNavigate()
    const loggedIn = isAuthenticated()

    const handleClick = (path: string) => {
        navigate(path)
    }

    return (
        <div className="w-full bg-background text-foreground border-b-2 border-foreground shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center">
                        <div
                            onClick={() => handleClick("/")}
                            className="cursor-pointer text-xl sm:text-2xl md:text-3xl lg:text-3xl text-foreground font-mono tracking-tighter font-bold"
                        >
                            StudySavvy
                        </div>
                    </div>

                    <div className="flex space-x-2 sm:space-x-4">
                        {loggedIn ? (
                            <>
                                <button
                                    onClick={() => handleClick("/course")}
                                    className="px-3 py-2 sm:px-6 sm:py-2 bg-card text-card-foreground border-2 border-foreground text-sm sm:text-base font-medium hover:opacity-80 transition-opacity shadow-sm"
                                >
                                    Courses
                                </button>

                                <button
                                    onClick={() => handleClick("/profile")}
                                    className="px-3 py-2 sm:px-6 sm:py-2 bg-card-foreground
                                     text-primary-foreground border-2 border-foreground text-sm sm:text-base font-medium hover:opacity-80 transition-opacity shadow-sm"
                                >
                                    Profile
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => handleClick("/login")}
                                    className="px-3 py-2 sm:px-6 sm:py-2 bg-card text-card-foreground border-2 border-foreground text-sm sm:text-base font-medium hover:opacity-80 transition-opacity shadow-sm"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={() => handleClick("/signup")}
                                    className="px-3 py-2 sm:px-6 sm:py-2 bg-destructive text-destructive-foreground border-2 border-foreground text-sm sm:text-base font-medium hover:opacity-80 transition-opacity shadow-sm"
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
