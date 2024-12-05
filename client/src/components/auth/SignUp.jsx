import { useState, useEffect, useRef } from "react";

import useFetch from "../../hooks/useFetch";

import Confirmation from "./Confirmation.jsx";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import InputWithLabel from "../ui/InputWithLabel";


const origin = import.meta.env.VITE_ORIGIN;

export default function SignUp(){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    // account creation status state
    const [ created, setCreated ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ password, setPassword ] = useState("");

    const signUp = async () => {
        const result = await fetchHandler(`${origin}/auth/sign-up`, controller.current.signal,
            {
                method: "POST",
                body: JSON.stringify({ email, name, password }),
                headers: { "Content-Type": "application/json" }
            }
        );
        if (result) setCreated(true);
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return ( created? <Confirmation 
        user= { {name, email} } 
        route= { `${origin}/auth/resend-confirmation-mail` }>
            <SignUpConfirmation name= {name} />
        </Confirmation> : <Card>
        <CardHeader>Create an account today!</CardHeader>
        <CardContent>
            <InputWithLabel 
                type="email"
                fieldName= "Email:"
                fieldValue= {email} 
                setField= {setEmail}
                required
            />
            { error?.errors?.email && <InputErrorField field= "email" errorMsg= { error?.errors?.email } /> }
            <InputWithLabel 
                type="text"
                fieldName= "Name:"
                fieldValue= {name} 
                setField= {setName}
                required
            />
            { error?.errors?.name && <InputErrorField field= "name" errorMsg= { error?.errors?.name } /> }

            <InputWithLabel 
                type="password"
                fieldName= "Password:"
                fieldValue= {password} 
                setField= {setPassword}
                required
                />     
            { error?.errors?.password && <InputErrorField field= "password" errorMsg= { error?.errors?.password } /> }
        </CardContent>
        <CardFooter>
            { isLoading? <ButtonLoading/> :
            <Button onClick= { () => signUp() }>Sign Up</Button> }
        </CardFooter>
    </Card>)
}

function SignUpConfirmation({name}){
    return (<>
        <h1>You're one step away</h1>   
        <p>from a delicious pizza {name}. Check your mail to confirm account registration. </p>
        <p>Click the button below to resend an email if you do not see anything within the next 10 minutes.</p>
    </>)
}

function InputErrorField({field, errorMsg}){
    const text = errorMsg.split(`${field}\``)[1];

    return(<>
        { text? <p>{field[0].toUpperCase() + field.slice(1) + text}</p> :
        <p>{errorMsg}</p> }
    </>)
}

