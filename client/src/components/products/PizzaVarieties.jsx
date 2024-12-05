import { useContext } from "react";

import { cartContext } from "../../contexts/CartContext";
import StockCounter from "./StockCounter";
import Product from "./Product";
export default function PizzaVarieties({products}){
    return <div>
        { products.map((val, i) => <Product key= {i} product= {val}>
            <PizzaVarietyCounter productId= {val._id} />
        </Product>) }
    </div>
}

/** Counter to update pizza variety qty in cart */
function PizzaVarietyCounter({productId}){
    const { setCart } = useContext(cartContext);

    const setQty = (count) => {
        setCart(cart => {
            const product = cart.products?.find((product) => product._id === productId);
            // add item to cart
            if (!product){
                cart.products?.push({_id: productId, qty: count});
                return {...cart};
            }
            // remove from cart qty stock reduced to 0
            if (!count) 
                cart.products = cart.products?.filter((val) => val._id !== product._id);
            // update qty
            else product.qty += count;
            return {...cart};
        });
    };

    return <StockCounter setQty= {setQty}/>
}