import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import './index.css'


function App() {
  return (
    <AuthContextProvider>
        <Routes>
            <Route path="/" element= { <SignUp/> } />
        </Routes>
    </AuthContextProvider>
  )
}

export default App
