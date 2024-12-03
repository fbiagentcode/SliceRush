import { useState } from "react";
export default function useFetch(){
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
            // set error response
            setError(result);
        }catch(err){
            setError({err});
        }
        finally{
            setIsLoading(false);
        }
    };

    return { fetchHandler, error, isLoading };
}