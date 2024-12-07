import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { authContext } from "../contexts/AuthContext";

import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "../components/users/UserDashboard";
import Error from "./Error";

export default function Dashboard(){
    const [ type, setType ] = useState("customer");
    const [ error, setError ] = useState(null);
    const { user: auth } = useContext(authContext);

    useEffect(() => {
        if (auth) setType(auth.role);
    }, [auth]);

    return <>
        { type === "customer" ? <UserDashboard/> : <AdminDashboard/> }
    </>
}



