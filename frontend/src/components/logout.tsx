import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
       
        localStorage.removeItem("token");

    
        navigate("/");
    };

    return (
        <button
            onClick={handleLogout}
            className="px-3 py-2 sm:px-6 sm:py-2 bg-destructive text-destructive-foreground border-2 border-foreground text-sm sm:text-base font-medium hover:opacity-80 transition-opacity shadow-sm"
        >
            Logout
        </button>

    );
}

export default LogoutButton;
