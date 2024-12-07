import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import UserDashboard from "./components/users/UserDashboard.jsx";
import Login from "./components/auth/Login.jsx";
import Order from "./pages/Order.jsx";
import './index.css'
import ResetCountersContextProvider from "./contexts/ResetCountersContext.jsx";


function App() {
    return (
        <AuthContextProvider>
        <CartContextProvider>
            <Routes>
                <Route path="/" element= { <Login/> } />
                <Route path="/order" element= { <Order/> } />
                <Route path="/dashboard" element= { <UserDashboard/> } />
                <Route element= { <ResetCountersContextProvider/> }>
                    <Route path="/admin-dashboard" element= { <AdminDashboard/> } />      
                </Route>
            </Routes>
        </CartContextProvider>
        </AuthContextProvider>
  )
}

export default App
