import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";
import ResetCountersContextProvider from "./contexts/ResetCountersContext.jsx";

import Error from "./pages/Error.jsx";
import AccountVerification from "./pages/AccountVerification.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import UserDashboard from "./components/users/UserDashboard.jsx";
import Header from "./components/header/Header.jsx";
import HeroSection from "./components/home/HeroSection.jsx";
import Order from "./pages/Order.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import './index.css'


function App() {
    return (
        <AuthContextProvider>
        <CartContextProvider>
        <ResetCountersContextProvider>
            <Header/>
            <Routes>
                <Route path="/" element= { <HeroSection/> } />
                <Route path="/order" element= { <Order/> } />
                <Route path="/dashboard" element= { <UserDashboard/> } />
                <Route path="/admin-dashboard" element= { <AdminDashboard/> } /> 
                <Route path="/auth/verify" element= { <AccountVerification/> } />     
                <Route path="/auth/reset-password" element= { <ResetPassword/> } />     
                <Route path="/error" element= { <Error/> } />
            </Routes>
        </ResetCountersContextProvider>
        </CartContextProvider>
        </AuthContextProvider>
  )
}

export default App
