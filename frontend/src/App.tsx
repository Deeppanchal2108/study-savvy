
import { Routes, Route } from "react-router-dom";
import { Landing } from "./pages/landing-page";
import { LoginPage } from "./pages/login-page";
import ProtectedRoutes from "./components/protected-routes";
import {SignupPage} from "./pages/signup-page";
function App() {

  return (
    <Routes>
    
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <ProtectedRoutes>
        
      </ProtectedRoutes>
      
    </Routes>
  )
}

export default App;

