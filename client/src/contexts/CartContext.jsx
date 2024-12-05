import { createContext, useState } from "react";
const cartContext = createContext({});
export default function CartContextProvider({children}){
    const [ cart, setCart ] = useState({});

    return <cartContext.Provider value= { {cart, setCart} } >
        {children}
    </cartContext.Provider>
}

export cartContext;