import { useContext } from "react";

import { cartContext } from "../../contexts/CartContext";
import StockCounter from "./StockCounter";
import Product from "./Product";
export default function PizzaVarieties({products, className= ""}){
    return <div className= "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { products.map((val, i) => <Product key= {i} product= {val}>
            <PizzaVarietyCounter product= {val} />
        </Product>) }
    </div>
}

/** Counter to update pizza variety qty in cart */
function PizzaVarietyCounter({ product: {_id, name, ...other} }){
    const { setCart } = useContext(cartContext);

    const setQty = (count) => {
        setCart(cart => {
            const product = cart.products?.find((product) => product._id === _id);
            
            // add price of pizza to total
            if (count) cart.amount += other.price?.amount;

            // add item to cart
            if (!product && count){
                cart.products?.push({_id, name, qty: count, ...other});
                return {...cart};
            }
            // remove from cart qty stock reduced to 0
            if (!count) 
                cart.products = cart.products?.filter((val) => val._id !== product._id);
            // update qty
            else product.qty = count;
            return {...cart};
        });
    };

    return <StockCounter setQty= {setQty}/>
}
