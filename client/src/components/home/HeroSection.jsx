import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Login from "../auth/Login";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import AccountConfirmationSuccess from "../auth/AccountConfirmationSuccess";
import { authContext } from "../../contexts/AuthContext";

export default function HeroSection(){
    const { user } = useContext(authContext);
    const navigate = useNavigate();
    const [ searchParams, setSearchParams ] = useSearchParams();

    const [ goToOrder, setGoToOrder ] = useState(false);
    const [ confirmationSuccessOpen, setConfirmationSuccessOpen ] = useState(false);
    const [ loginOpen, setLoginOpen ] = useState(false);

    const accountCreated = searchParams.get("confirmed");
    const login = searchParams.get("login");

    const handleOrderNow = () => {
        if (goToOrder) return navigate("/order");
        setSearchParams({});
    };

    useEffect(() => {
        if (accountCreated) setConfirmationSuccessOpen(true);
        else setConfirmationSuccessOpen(false);
    }, [accountCreated]);

    useEffect(() => {
        if (login) setLoginOpen(true);
        else setLoginOpen(false);
    }, [login]);

    useEffect(() => {
        if (user) setGoToOrder(true);
        else setGoToOrder(false);
    }, [user]);

    return <Card>
        <CardContent>
            <h1>Slice Rush</h1>
        </CardContent>
        <CardFooter>
            <Dialog open= {loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                    <Button onClick= {handleOrderNow}>Order now!</Button>
                </DialogTrigger>
                <DialogContent className= " h-[550px] bg-gradient-to-bl from-black from-60% to-grey-800 rounded-2xl shadow-lg border-none max-w-sm p-4 ">
                    <VisuallyHidden.Root>
                        <DialogTitle>Login</DialogTitle>
                        <DialogDescription>
                            Enter your email and password to start using Slice Rush.
                        </DialogDescription>
                    </VisuallyHidden.Root>
                    <Login/>
                </DialogContent>
            </Dialog>
            <AccountConfirmationSuccess open= {confirmationSuccessOpen} setOpen={setConfirmationSuccessOpen} />
        </CardFooter>
    </Card>
}