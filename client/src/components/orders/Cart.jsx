import { useContext } from "react";

import { cartContext } from "../../contexts/CartContext";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** Displays current cart */
export default function Cart(){
    const { cart } = useContext(cartContext);

    return <Card>
        <CardHeader>
            <h1>Your selected items:</h1>
        </CardHeader>
        <CardContent>
            { cart.products?.map(({_id, name, qty}, i) => 
                <FieldValueRow key= {i} field= {name} value= {qty} />) }
        </CardContent>
        <CardFooter>
            <FieldValueRow field= "Total" value= {cart.amount} />
        </CardFooter>
    </Card>
}

function FieldValueRow({field, value}){
    return <div>
        <p>{field}</p>
        <p>{value}</p>
    </div>
}