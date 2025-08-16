import { Navigate } from "react-router-dom";

import { isAuthenticated } from "@/lib/auth";
import type { JSX } from "react";

export default function ProtectedRoutes({ children }: { children?: JSX.Element }) {


    if (isAuthenticated()) {
        return <Navigate to={'/login'} />

    }
    return children;

}