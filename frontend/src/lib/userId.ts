import { jwtDecode } from "jwt-decode";

interface TokenPayload {
    id: string;  
    exp: number; 
    iat: number; 
}

export function getCurrentUserId() {
    const token = localStorage.getItem("token"); 
    if (!token) return null;

    try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.id; 
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
}
