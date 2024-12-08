import { useContext, useEffect, useRef, useState } from "react";

import { authContext } from "../../contexts/AuthContext";

import useFetch from "../../hooks/useFetch";
import useProducts from "../../hooks/useProducts";
import Error from "../../pages/Error";
import Profile from "../users/Profile";
import OrdersTable from "@/components/orders/OrdersTable";
import ProductStockManager from "@/components/admin/ProductStockManager";


const origin = import.meta.env.VITE_ORIGIN;

export default function AdminDashboard(){
    const { fetchHandler, isLoading, error, setError } = useFetch();
    const { fetchProducts, ingredients, isLoading: productsLoading, setIngredients } = useProducts();
    const controllers = useRef([]);

    const { user: auth } = useContext(authContext);
    const [ admin, setAdmin ] = useState({});
    const [ orders, setOrders ] = useState([]);

    const getDetails = async () => {
        setError(null);
        controllers.current = Array.from({ length: 3 }, () => new AbortController());

        const getUser = fetchHandler(`${origin}/users/${auth._id}`, controllers.current[0].signal);
        const getOrders = fetchHandler(`${origin}/orders`, controllers.current[1].signal);
        const getProducts = fetchProducts(controllers.current[2].signal);

        const results = await Promise.all([getUser, getOrders, getProducts]);
        setAdmin(results[0]);
        setOrders(results[1]?.slice().reverse());
    };

    
    useEffect(() => {
        controllers.current = Array.from({ length: 3 }, () => new AbortController());
        
        return () => {
            console.log("admin dashboard unmount");
            controllers.current.forEach((signal => {signal.abort()})); 
        }
    }, []);
    
    useEffect(() => {
        if (!auth) return setError({code: 401});
        getDetails();
    }, [auth]);

    return <div>
        { error && <Error code= {error.code}/> }
        { auth && <>
            <OrdersTable orders= {orders} setOrders= {setOrders}/> 
            <ProductStockManager products= {ingredients} setProducts= {setIngredients}/>
            <Profile user= {admin} /> 
        </> }
    </div>
}