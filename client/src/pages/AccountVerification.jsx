import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import Error from "./Error";

import { Button } from "../components/ui/button";
import ButtonLoading from "../components/ui/ButtonLoading";
import InputWithLabel from "../components/ui/InputWithLabel";

const origin = import.meta.env.VITE_ORIGIN;

export default function AccountVerification(){
    const [ searchParams, setSearchParams ] = useSearchParams();
    const controller = useRef();

    const navigate = useNavigate();
    const { fetchHandler, isLoading, error, setError } = useFetch();

    const handleVerification = async () => {
        const token = searchParams.get("token");

        const user = await fetchHandler(`${origin}/auth/confirmation?token=${token}`, controller.current.signal,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            }
        );

        if (user) {
            return navigate("/?confirmed=true");
        }
    };

    useEffect(() => {
        controller.current = new AbortController();
        handleVerification();

        return () => controller.current.abort();
    }, []);

    return <>
        {error && <Error code= {error.code} msg= {error.errors}/> }
    </>
}