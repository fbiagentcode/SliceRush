import { useEffect } from "react";
export default function useWindowResizeListener(callbackFn){
    useEffect(() => {
        callbackFn();
        window.addEventListener("resize", callbackFn);

        return () => window.removeEventListener("resize", callbackFn);
    }, [])
}

