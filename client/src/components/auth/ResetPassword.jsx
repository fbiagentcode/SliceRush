import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import InputWithLabel from "../ui/InputWithLabel";

const origin = import.meta.env.VITE_ORIGIN;

export default function ResetPassword(){
    const { fetchHandler, isLoading, error, setError } = useFetch();
    const controller = useRef();
    const [ searchParams ] = useSearchParams();
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ success, setSuccess ] = useState(false);

    const resetPassword = async () => {
        // confirm passwords entered match 
        if (password !== confirmPassword) return setError({errors: "Passwords do not match."});

        const result = await fetchHandler(`${origin}/auth/reset-password?token=${searchParams.get("token")}`, controller.current.signal,
            {
                method: "PUT",
                body: JSON.stringify({ password }),
                headers: { "Content-Type": "application/json" }
            }
        );
        if (result) setSuccess(true);
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return success? <ResetSuccess/> : <Card>
        <CardHeader>
            <h1>Reset your password</h1>
        </CardHeader>
        <CardContent>
            <InputWithLabel
                fieldName= "New Password"
                fieldValue= {password}
                setField= {setPassword}
                type= "password"
            />
            <InputWithLabel
                fieldName= "Confirm Password"
                fieldValue= {confirmPassword}
                setField= {setConfirmPassword}
                type= "password"
            />
        </CardContent>
        <CardFooter>
            { error?.errors && <p>{error.errors}</p> }
            { isLoading? <ButtonLoading/> :
            <Button onClick= { resetPassword }>Reset</Button> }
        </CardFooter>
    </Card>
}

function ResetSuccess(){
    const navigate = useNavigate();

    return <Card>
        <CardContent>
            <img src= "/images/passwordReset.png" alt= "reset successful" />
            <h1>Your password was successfully reset.</h1>
            <p>You can login again with your updated info.</p>
        </CardContent>
        <CardFooter>
            <Button onClick= { () => navigate("/") }>Home</Button>
        </CardFooter>
    </Card>
}