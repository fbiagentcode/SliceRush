import { useContext, useEffect, useRef, useState } from "react";

import { authContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import Error from "../../pages/Error";
import Profile from "./Profile";
import OrdersTable from "@/components/orders/OrdersTable";


const origin = import.meta.env.VITE_ORIGIN;

export default function UserDashboard(){
    const { fetchHandler, isLoading, error, setError } = useFetch();
    const controllers = useRef([]);
    const { user: auth } = useContext(authContext);
    const [ user, setUser ] = useState({});
    const [ orders, setOrders ] = useState([]);

    const getUserDetails = async () => {
        setError(null);
        const getUser = fetchHandler(`${origin}/users/${auth._id}`, controllers.current[0].signal);
        const getOrders = fetchHandler(`${origin}/orders?userId=${auth._id}`, controllers.current[1].signal);
        const results = await Promise.all([getUser, getOrders]);
        setUser(results[0]);
        setOrders(results[1]?.slice().reverse());
    };

    useEffect(() => {
        controllers.current = [new AbortController, new AbortController];

        return () => controllers.current.forEach((signal => signal.abort()));
    }, []);

    useEffect(() => {
        if (!auth) return setError({code: 401});
        getUserDetails();
    }, [auth]);

    return error? <Error code= {error.code} /> : <div>
        <OrdersTable orders= {orders} />
        <Profile user= {user} />
    </div>
}