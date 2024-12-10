import { useContext, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

const linkVariants = {exit: {opacity: 0, x: "-100%"}, hidden: {opacity: 0, x: "-100%"}, visible: {opacity: 1, x: 0} };
const listVariants = {
    visible: {
        height: "auto",
        opacity: 1, 
    }, 
    hidden: {
        height: 0,
        opacity: 0
    },
    exit: {
        margin: 0,
        height: 0,
        opacity: 0,
        transition: {delay: 0.1}
    }
} 

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

    return (
    <motion.ul
        initial="hidden"
        animate="visible"
        exit="exit"
        transition= { {ease: "easeInOut", staggerChildren: 0.1, delayChildren: 0.2} }
        variants={listVariants}
        className="font-helvetica tracking-tight sm:grid sm:grid-cols-2 sm:justify-center sm:gap-4 sm:mt-8"
    >
                <motion.div variants= {linkVariants}>
                        <NavLink to= "/">Home</NavLink>
                </motion.div>
                { user? <>
                    <motion.div variants= {linkVariants}>
                            <NavLink to= { user.role === "customer"? "/dashboard" : "/admin-dashboard" }>
                                Dashboard
                            </NavLink>

                    </motion.div>
                        
                    <motion.div variants= {linkVariants}>

                            { isLoading? <ButtonLoading>Logging out...</ButtonLoading> :
                            <Button 
                                className= "text-2xl bg-transparent text-grey-10"
                                onClick= {handleLogout}
                            >
                                Log Out
                            </Button> }

                    </motion.div>
                </> : 
                <motion.div variants= {linkVariants}>

                        <NavLink to="/?login=true">Login</NavLink>

                </motion.div> }
    </motion.ul>);
}