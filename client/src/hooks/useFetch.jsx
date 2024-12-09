import { useState, useContext } from "react";
import { authContext } from "../contexts/AuthContext.jsx";

export default function useFetch(){
    const { dispatch } = useContext(authContext);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const fetchHandler = async (endpoint, signal, options) => {
        try{
            setIsLoading(true);
            setError(null);
            const response = await fetch(endpoint, {signal, ...options, credentials: "include"});
            const result = await response.json();
            // return data
            if (response.ok){
                return result;
            }

            // remove local storage user details if invalid token
            if (result?.errors instanceof Array && result?.errors?.includes("token")) {
                dispatch({type: "LOGOUT"});
            }
            
            // set error response
            setError({...result, code: response.status});
        }catch(err){
            setError({err});
        }
        finally{
            setIsLoading(false);
        }
    };

    return { fetchHandler, error, setError, isLoading };
}