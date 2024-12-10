import { useContext, useState } from "react";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import useWindowResizeListener from "../../hooks/useWindowResizeListener.jsx";

const navVariants = {hidden: {y: "-100%"}, visible: {y: 0} };

export default function Header(){ 
    const [isVisible, setVisible ] = useState(true);
    const [isOpen, setOpen ] = useState(false);
    const { scrollY } = useScroll();

    useWindowResizeListener(() => {
        if (window.innerWidth >= 780)
            setOpen(true)
    });

    useMotionValueEvent(scrollY, "change", (current) => {
        setVisible(current > scrollY.getPrevious() && current > 100? false : true);
    });

    return (
    <motion.div 
        className= "text-xl text-white fixed top-0 left-0 w-full z-50 bg-[rgba(0,0,0,0.3)] backdrop-blur-md flex items-center justify-between px-4 py-6 "
        variants= { navVariants }
        animate= { isVisible? "visible" : "hidden" }
        transition= { {duration: 0.5, ease: "easeInOut"} }
    >
        <p className= "font-helvetica-ex px-4 text-red-600">Slice Rush</p>
        <AnimatePresence mode= "wait">
            { isOpen && <Navbar/> }
        </AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setOpen((prev) => !prev)}
            className={`flex flex-col items-center justify-center gap-1 cursor-pointer sm:justify-self-end ${
            isOpen ? "transform rotate-180" : ""
            }`}
        >
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
            <div className={`w-6 h-0.5 bg-white rounded-full ${isOpen ? "hidden" : "block"}`}></div>
            <div className="w-6 h-0.5 bg-white rounded-full"></div>
        </motion.div>
    </motion.div>);
}