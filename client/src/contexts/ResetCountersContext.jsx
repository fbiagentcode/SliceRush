import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const contextDefaultValue = { reset: false };
export const resetCountersContext = createContext(contextDefaultValue);

export default function ResetCountersContextProvider({children}){
    const [ resetCounters, setResetCounters ] = useState(contextDefaultValue);

    return <resetCountersContext.Provider value= { {resetCounters, setResetCounters} } >
        <Outlet />
        {children}
    </resetCountersContext.Provider>
}
