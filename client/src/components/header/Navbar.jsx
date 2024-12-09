import { useContext, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
    const controller = useRef();
    const { user, dispatch } = useContext(authContext);

    const handleLogout = async () => {
        const result = await fetchHandler(`${origin}/auth/logout`, controller.current.signal);
        
        dispatch({type: "LOGOUT"});
        navigate("/");
        
    };

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    return <NavigationMenu className= "mx-8 grow-2 font-semi-bold">
        <NavigationMenuList className= "flex flex-row gap-x-8 justify-even items-center">
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
                        className= "text-2xl bg-transparent text-grey-10"
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