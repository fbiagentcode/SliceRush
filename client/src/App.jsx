import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import CartContextProvider from "./contexts/CartContext.jsx";
import Error from "./pages/Error.jsx";
import Login from "./components/auth/Login.jsx";
import Order from "./pages/Order.jsx";
import './index.css'


function App() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <Routes>
            <Route path="/" element= { <Login/> } />
            <Route path="/order" element= { <Order/> } />
            <Route path="/error" element= { <Error/> } />
        </Routes>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

export default App
