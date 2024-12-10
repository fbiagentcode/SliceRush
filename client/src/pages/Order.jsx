import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import {ScrollArea} from "../components/ui/scroll-area";
import Cart from "../components/orders/Cart";
import OrderConfirmation from "../components/orders/OrderConfirmation";
import PizzaVarieties from "../components/products/PizzaVarieties";
import { Button } from "../components/ui/button";
import Success from "../components/auth/Success";
import ButtonLoading from "../components/ui/ButtonLoading";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import CustomPizzaCreator from "../components/orders/CustomPizzaCreator";

export default function Order(){
    const { fetchProducts, ingredients, pizzaVarieties, isLoading, error } = useProducts();
    const controller = useRef();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();
    
    const [ successOpen, setSuccessOpen ] = useState(false);
    const [ pizzaCreatorOpen, setPizzaCreatorOpen ] = useState(false);

    const successTrue = searchParams.get("success");

    const getProducts = async () => {
        const fetchedIngredients = await fetchProducts(controller.current.signal);
        console.log(fetchedIngredients);

        controller.current = new AbortController();
        const fetchedPizzas = await fetchProducts(controller.current.signal, {pizzaVarieties: true});
        console.log(fetchedPizzas);
    };

    useEffect(() => {
        controller.current = new AbortController();
        getProducts();
        
        return () => controller.current.abort();
    }, []);

    useEffect(() => {
        if (successTrue) setSuccessOpen(true);
    }, [successTrue])
    
    return error? <Error code= {error.code}/> : (
    <div className= " max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative grid grid-cols-1 sm:grid-cols-12 ">
        <div className= "col-span-12 flex w-full justify-center gap-4">
            <Success 
                open= {successOpen}
                setOpen= {setSuccessOpen}
                title= "Order Placed"
                msg= "Thank you for using Slice Rush!"
                desc= "Your order has been successfully placed. You may track the status of your order in the dashboard."
            />
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="sm: w-auto md:font-helvetica text-3xl mb-4 tracking-tight py-20 px-20 text-center">View Cart</Button>
                </DialogTrigger>
                <DialogContent className= "bg-gradient-to-bl from-black from-60% to-grey-800 border-none overflow-y max-h-screen">
                    <DialogHeader>
                        <DialogTitle className= "text-white tracking-tight text-2xl m-4">Cart</DialogTitle>
                    </DialogHeader>
                    <Cart/>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="font-helvetica text-3xl tracking-tight py-20 px-20 text-center">Order Now</Button>                
                </DialogTrigger>
                <DialogContent className= "bg-gradient-to-bl from-black from-60% to-grey-800 overflow-y max-h-screen">
                <ScrollArea className= "h-[500px] w-full rounded-lg ">
                    <DialogHeader>
                        <DialogTitle className= "text-white tracking-tight text-2xl m-4 mb-0">Confirm Order Details:</DialogTitle>
                    </DialogHeader>
                    <OrderConfirmation/>
                </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
        <div className= "flex flex-col items-center justify-center text-grey-10 col-span-12 sm:col-span-8 lg:col-span-12 order-1 p-4">
            <Dialog open= {pizzaCreatorOpen} onOpenChange= {setPizzaCreatorOpen}>
                <DialogTrigger asChild>
                    <Button className="tracking-tight font-helvetica text-5xl py-40 px-20 mb-4 sm:w-auto text-center">Create your own pizza!</Button>
                </DialogTrigger>
                <DialogContent className= "bg-gradient-to-bl from-black from-45% to-grey-500">
                    <DialogHeader>
                        <DialogTitle className= "text-2xl text-white m-4 mb-0 tracking-tight">Customize your pizza!</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className= "h-[450px] w-full rounded-lg">
                        <CustomPizzaCreator products= {ingredients} setOpen= {setPizzaCreatorOpen}/>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
            <p className= "my-8 text-lg text-center">Or, pick from the many delicious pizzas available</p>

                <PizzaVarieties products= {pizzaVarieties} />
            
        </div> 
    </div>)
}