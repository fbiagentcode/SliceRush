import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const contextDefaultValue = { reset: false };
export const resetCountersContext = createContext(contextDefaultValue);

export default function ResetCountersContextProvider({children}){
    const [ resetCounters, setResetCounters ] = useState(contextDefaultValue);

    useEffect(() => {
        return () => console.log("counter unmount");
    }, []);

    return <resetCountersContext.Provider value= { {resetCounters, setResetCounters} } >
        {children}
    </resetCountersContext.Provider>
}
