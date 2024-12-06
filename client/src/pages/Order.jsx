import { useState, useEffect, useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import Cart from "../components/orders/Cart";
import OrderConfirmation from "../components/orders/OrderConfirmation";
import PizzaVarieties from "../components/products/PizzaVarieties";
import { Button } from "../components/ui/button";
import ButtonLoading from "../components/ui/ButtonLoading";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import CustomPizzaCreator from "../components/orders/CustomPizzaCreator";

export default function Order(){
    const { fetchProducts, ingredients, pizzaVarieties, isLoading, error } = useProducts();
    const controller = useRef();
    const navigate = useNavigate();

    const getProducts = async () => {
        await fetchProducts(controller.current.signal);
        console.log(ingredients);
        controller.current = new AbortController();
        console.log(pizzaVarieties);
        fetchProducts(controller.current.signal, {pizzaVarieties: true});
    };

    useEffect(() => {
        controller.current = new AbortController();
        getProducts();
        
        return () => controller.current.abort();
    }, []);

    useEffect(() => {
        if (error) navigate("/error");
    }, [error])
    
    return <>
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>View Cart</Button>
                </DialogTrigger>
                <DialogContent>
                    <Cart/>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button>Order Now</Button>                
                </DialogTrigger>
                <DialogContent>
                    <OrderConfirmation/>
                </DialogContent>
            </Dialog>
        </div>
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Create your own pizza!</Button>
                </DialogTrigger>
                <DialogContent className= "overflow-y-scroll max-h-screen">
                    <DialogHeader>
                        <DialogTitle>Customize your pizza!</DialogTitle>
                    </DialogHeader>
                    <CustomPizzaCreator products= {ingredients}/>
                </DialogContent>
            </Dialog>
            <p>Or, pick from the many delicious pizzas available</p>
            <PizzaVarieties products= {pizzaVarieties} />
        </div>
    </>
}