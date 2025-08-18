
import { Outlet } from "react-router-dom";
import Navbar from "./section/navbar";
function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet /> 
            </main>
        </div>
    );
}

export default Layout;
