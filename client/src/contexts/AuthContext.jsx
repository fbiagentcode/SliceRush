import { createContext, useReducer, useEffect } from "react";
export const authContext = createContext(null);

export default function AuthContextProvider({children}){
    const [ user, dispatch ] = useReducer(authReducer, null);

    useEffect(() => {
        if (!user){
            // get user details from local storage
            const userStorage = localStorage.getItem("user");
            if(userStorage) dispatch({type: "LOGIN", payload: JSON.parse(userStorage)});
        }

        return () => console.log("auth unmount");
    }, [])

    // test effect
    useEffect(() => console.log("auth", user));

    return <authContext.Provider value= { { user, dispatch } }>
        {children}
    </authContext.Provider>
}

function authReducer(state, {payload, type}){
    switch (type){
        case "LOGIN":
        case "UPDATE":
            const user = { 
                _id: payload._id, 
                role: payload.role, 
                name: payload.name, 
                imageUrl: payload.imageUrl
            };
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        case "LOGOUT":
            localStorage.removeItem("user");
            return null;
        default: return state;
    }
}