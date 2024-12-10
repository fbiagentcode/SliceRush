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

    return <Card className= "text-center mt-40 bg-transparent border-none w-full relative h-screen overflow-hidden">
        <CardContent className= "p-0">
            <div className= "bg-transparent h-full absolute z-20 top-1/2 left-1/3 transform translate-x-[-25%] translate-y-[-50%] leading-none ">
                <h1 className= "px-7 font-unison text-red-400 text-7xl md:text-9xl p-0">Slice Rush</h1>
                <p className= "px-4 text-white mt-8 md:px-4 text-xl">Fresh, fast, and irresistibly delicious – Your pizza cravings end here at SliceRush!</p>
            </div>
            <div className="inset-0 relative min-h-screen min-w-full flex items-center justify-center">
  <video
    autoPlay
    loop
    muted
    className="absolute h-auto w-full max-w-none  scale-100 sm:scale-150"
  >
    <source src="/videos/pizza.mp4" type="video/mp4" />
  </video>
</div>

        </CardContent>
        <CardFooter>
            <Dialog open= {loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                    <Button className= "tracking-tight font-helvetica py-10 absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[130%] z-50 text-3xl text-white" onClick= {handleOrderNow}>Order now!</Button>
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