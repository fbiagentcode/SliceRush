import { createContext, useState } from "react";

const cartDefault = {amount: 0, products: []};
export const cartContext = createContext(cartDefault);

export default function CartContextProvider({children}){
    const [ cart, setCart ] = useState(cartDefault);

    return <cartContext.Provider value= { {cart, setCart} } >
        {children}
    </cartContext.Provider>
}
