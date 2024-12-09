import { useContext } from "react";

import { cartContext } from "../../contexts/CartContext";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** Displays current cart */
export default function Cart(){
    const { cart } = useContext(cartContext);

    return <Card className= "bg-transparent border-none text-grey-10">
        <CardHeader>
            <h1 className= "text-xl text-white-50">Your selected items:</h1>
        </CardHeader>
        <CardContent>
            { cart.products?.map(({_id, name, qty}, i) => 
                <FieldValueRow key= {i} field= {name} value= {qty} />) }
        </CardContent>
        <CardFooter >
            <FieldValueRow field= "Total" value= {cart.amount} />
        </CardFooter>
    </Card>
}

function FieldValueRow({field, value}){
    return <div className= "text-white-50">
        <p className= "text-grey-50">{field}</p>
        <p>{value}</p>
    </div>
}