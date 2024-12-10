import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import { authContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import InputWithLabel from "../ui/InputWithLabel";

const origin = import.meta.env.VITE_ORIGIN;

export default function Login(){
    const { dispatch } = useContext(authContext);
    const navigate = useNavigate();
    const { fetchHandler, isLoading, error } = useFetch();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const controller = useRef();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const login = async () => {
        const user = await fetchHandler(`${origin}/auth/login`, controller.current.signal,
            {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" }
            }
        );

        if (user) {
            dispatch({type: "LOGIN", payload: user});
            navigate("/order");
        }
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    const isForgotPassword = searchParams.get("forgotPassword");
    const isSignUp = searchParams.get("signUp");

    return isForgotPassword? <ForgotPassword/> : isSignUp? <SignUp/> : 
    <Card className= "bg-transparent border-none text-white">
        <CardHeader className= "text-2xl tracking-tight">LOGIN</CardHeader>
        <CardContent className= "text-grey-5 flex flex-col justify-center gap-y-4 ">
            <InputWithLabel 
                type="email"
                fieldName= "Email:"
                fieldValue= {email} 
                setField= {setEmail}
                required
            />
            <InputWithLabel 
                type="password"
                fieldName= "Password:"
                fieldValue= {password} 
                setField= {setPassword}
                required
                />     
            { error?.errors && <p>{error.errors}</p> }
        </CardContent>
        <CardFooter className= "flex flex-col items-even gap-y-0.5 text-white-50">
            { isLoading? <ButtonLoading/> :
            <Button 
                className= "text-md py-2 px-4 bg-grey-100 rounded-lg" 
                onClick= { () => login() }
            >
                Login
            </Button> }
            <p 
                className= "mt-4 hover:text-white hover:cursor-pointer transition-colors"
                onClick= { () => setSearchParams({"forgotPassword": true}) }
            >
                Forgot password?
            </p>
            <hr className="h-px w-full my-2 bg-grey-100 border-0"></hr>
            <p className= "text-white">OR</p>
            <p>Don't have an account? </p>
            <Button
                className= "text-md py-2 my-4 px-4 bg-grey-100 rounded-lg " 
                onClick= { () => setSearchParams({"signUp": true}) }
            >
                Sign Up
            </Button>
        </CardFooter>
    </Card>
}