import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import Login from "./components/auth/Login.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import './index.css'


function App() {
  return (
    <AuthContextProvider>
        <Routes>
            <Route path="/" element= { <Login/> } />
            <Route path="/reset-password" element= { <ResetPassword/> } />
        </Routes>
    </AuthContextProvider>
  )
}

export default App
