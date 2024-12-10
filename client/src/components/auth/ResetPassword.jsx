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
        if (!password || !confirmPassword) return setError({errors: "Password and confirmed password required."});
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

    return success? <ResetSuccess/> : <Card className= "mt-28 h-max flex flex-col items-center bg-transparent border-none text-white">
        <CardHeader className= "text-4xl tracking-tight">
            <h1 className= "mt-20">Reset your password</h1>
        </CardHeader>
        <CardContent className= "text-grey-5 p-14 text-xl gap-y-5 flex flex-col justify-center">
            <InputWithLabel
                fieldName= "New Password:"
                fieldValue= {password}
                setField= {setPassword}
                type= "password"
            />
            <InputWithLabel
                fieldName= "Confirm Password:"
                fieldValue= {confirmPassword}
                setField= {setConfirmPassword}
                type= "password"
            />
        </CardContent>
        <CardFooter className= "flex flex-col justify-center gap-y-4">
            { error?.errors && <p>{error.errors}</p> }
            { isLoading? <ButtonLoading/> :
            <Button className= "font-helvetica tetx-xl" onClick= { resetPassword }>Reset</Button> }
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