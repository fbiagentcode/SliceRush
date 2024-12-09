import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import useWindowResizeListener from "../hooks/useWindowResizeListener.jsx";

const navVariants = {hidden: {y: "-100%"}, visible: {y: 0} };
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

export default function Header(){
    return (<div className= "top-0 left-0 fixed flex flex-row items-center  pt-6 p-5 bg-[rgba(5, 5, 5, 0.347)] w-full text-2xl backdrop-filter backdrop-blur-xl">
        <p className= "font-helvetica-ex px-4">Slice Rush</p>
        <Navbar />
    </div>);
}