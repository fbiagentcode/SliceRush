import { useState, useRef, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";

import useFetch from "../../hooks/useFetch";
import { cartContext } from "../../contexts/CartContext";
import Cart from "./Cart";
import InputWithLabel from "../ui/InputWithLabel";
import { Button } from "../ui/button";

const origin = import.meta.env.VITE_ORIGIN;
const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export default function OrderConfirmation(){
    const { fetchHandler, isLoading, error } = useFetch();
    const { cart } = useContext(cartContext);
    const controller = useRef();
    const [ destination, setDestination ] = useState("");

    // open payment portal after server sets up session
    const handlePayment = async () => {
        const stripe = await loadStripe(publishableKey);
        
        const content = {
            deliveryAddress: destination,
            total: {amount: cart.amount, currency: "INR"},
            cart,
            successUrl: `${window.location}`,
            cancelUrl:  `${window.location.origin}/dashboard`
        };
        
        const { sessionId } = await fetchHandler(`${origin}/payments/checkout-session`, controller.current.signal,
        {
            method: "POST",
            body: JSON.stringify(content),
            headers: { "Content-Type": "application/json" }
        });

        // open checkout page
        const { error } = await stripe.redirectToCheckout({sessionId});
        if (error) setError({errors: error.message});
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <div className= "flex flex-col justify-center gap-4 ">
        <Cart/>
        <InputWithLabel 
            fieldName= "Destination Address:"
            fieldValue= {destination}
            setField= {setDestination}
        />
        { destination && Boolean(cart.amount) && <Button onClick= {handlePayment}>Proceed to payment</Button> }
    </div>
}