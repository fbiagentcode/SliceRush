import { useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { authContext } from "../../contexts/AuthContext";

const origin = import.meta.env.VITE_ORIGIN;

export default function Navbar(){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const { user, dispatch } = useContext(authContext);

    const handleLogout = async () => {
        const result = await fetchHandler(`${origin}/auth/logout`, controller.current.signal);
        if (result)
            dispatch({type: "LOGOUT"});
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                Slice Rush
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavLink to= "/">Home</NavLink>
            </NavigationMenuItem>
            { user? <>
                <NavigationMenuItem>
                    <NavLink 
                        
                        to= { user.role === "customer"? "/dashboard" : "/admin-dashboard" }
                    >
                        Dashboard
                    </NavLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    { isLoading? <ButtonLoading>Logging out...</ButtonLoading> :
                    <Button 
                        variant= "ghost" 
                        onClick= {handleLogout}
                    >
                        Log Out
                    </Button> }
                </NavigationMenuItem>
            </> : 
            <NavigationMenuItem>
                <NavLink to="/?login=true">Login</NavLink>
            </NavigationMenuItem>
            }
        </NavigationMenuList>
    </NavigationMenu>

}