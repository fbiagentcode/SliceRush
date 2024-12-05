import { useState, useEffect, useContext, useRef } from "react";

import useFetch from "../../hooks/useFetch";

import Confirmation from "./Confirmation";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import InputWithLabel from "../ui/InputWithLabel";

const origin = import.meta.env.VITE_ORIGIN;
const route = `${origin}/auth/forgot-password`;

export default function ForgotPassword(){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const [ email, setEmail ] = useState("");
    const [ mailSent, setMailSent ] = useState(false);

    const sendMail = async () => {
        const result = await fetchHandler(route, controller.current.signal,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" }
            }
        );
        if (result) setMailSent(true);
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return mailSent? <Confirmation
            route= {route}
            user= { {email} }
        >
            <ForgotPasswordConfirmation/>
        </Confirmation> : <Card>
        <CardHeader>
            <h1>Reset Password</h1>
        </CardHeader>
        <CardContent>
            <p>Please enter your email address to confirm password reset.</p>
            <InputWithLabel 
                fieldName= "Email:" 
                fieldValue= {email} 
                setField= {setEmail} 
                type="email" 
            />
        </CardContent>
        <CardFooter>
            { error?.errors && <p>{error.errors}</p> }
            { isLoading? <ButtonLoading/> : 
            <Button onClick= { sendMail }>Send mail</Button> }
        </CardFooter>
    </Card>
}

function ForgotPasswordConfirmation(){
    return (<>
        <h1>Link Sent</h1>
        <p>A link has been sent to your mail, use it to reset your password. Please retry after sometime later if email is not found in inbox.</p>
    </>);
}