import { useState, useEffect, useRef } from "react";

import useFetch from "../../hooks/useFetch";

import { ScrollArea } from "../ui/scroll-area"
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";

export default function Confirmation({ user: {email, name}, children, route }){
    const { fetchHandler, isLoading, error } = useFetch();
    const [ mailSent, setMailSent ] = useState(false);
    const controller = useRef();

    const resendMail = async () => {
        setMailSent(false);
        const result = await fetchHandler(route, controller.current.signal,
            {
                method: "POST",
                body: JSON.stringify({ email, name }),
                headers: { "Content-Type": "application/json" }
            }
        );
        if (result) setMailSent(true);
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return  (
    <ScrollArea className= " w-full rounded-lg ">
        <Card className= "bg-transparent border-none text-white">
            <CardContent className= "text-grey-5 flex flex-col justify-center gap-y-4 ">
                <img src="/images/mailSent.png" alt="mail sent" />
                { children }
                { isLoading? <ButtonLoading/> : <Button onClick= { () => resendMail(route) }>Resend Email</Button> }
            </CardContent>
            <CardFooter>
                { mailSent && <p>A confirmation mail has been sent to your inbox.</p> }
                { error && error.errors }
            </CardFooter>
        </Card>
    </ScrollArea>)
}