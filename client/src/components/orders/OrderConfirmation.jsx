import { useState } from "react";
import Cart from "./Cart";
import InputWithLabel from "../ui/InputWithLabel";
import { Button } from "../ui/button";

export default function OrderConfirmation(){
    const [ destination, setDestination ] = useState(null);
    return <div>
        <Cart/>
        <InputWithLabel 
            fieldName= "Destination Address:"
            fieldValue= {destination}
            setField= {setDestination}
        />
        <Button>Proceed to payment</Button>
    </div>
}