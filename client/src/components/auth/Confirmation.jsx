import { useState, useEffect, useRef } from "react";

import useFetch from "../../hooks/useFetch";

import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";

export default function Confirmation({signUp, name}){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <Card>
        <CardContent>
            <img src="/images/mailSent.png" alt="mail sent" />
            <h1>You're one step away</h1>
            <p>from a delicious pizza {name}. Check your mail to confirm account registration. Click the button below to resend an email if you do not see anything within the next 10 minutes.</p>
            { isLoading? <ButtonLoading/> : <Button onClick= { () => signUp() }>Resend Email</Button> }
        </CardContent>
    </Card>
}