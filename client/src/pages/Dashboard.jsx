import { useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../contexts/AuthContext";

import AdminDashboard from "../components/admin/AdminDashboard";
import UserDashboard from "../components/users/UserDashboard";
import Error from "./Error";

export default function Dashboard(){
    const [ type, setType ] = useState(null);
    const [ error, setError ] = useState(null);
    const { user: auth } = useContext(authContext);

    useEffect(() => {
        if (!auth) return setError({code: 401});
        setError(null);
        setType(auth.role);
    }, [auth]);

    return (<>
        { error && <Error code= {error.code} /> }
        { type === "customer"? <UserDashboard/> : <AdminDashboard/> }
    </>);

}