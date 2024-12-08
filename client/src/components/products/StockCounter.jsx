import { useState, useEffect, useContext } from "react";

import { resetCountersContext } from "../../contexts/ResetCountersContext";
import { Button } from "../ui/button";

/** A counter component for product stock */
export default function StockCounter({setQty, product}){
    const { resetCounters } = useContext(resetCountersContext);
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        setQty(count, product);
    }, [count])

    // reset counter depending on context
    useEffect(() => {
        if (resetCounters?.reset) setCount(0)
    }, [resetCounters]);

    // update counter
    const updateCount = (inc= true) => {
        const value = inc? 1 : -1;
        // prevent negative qty
        if (count + value < 0) return;
        setCount((prev) => prev + value );
    }

    return <div className= "flex flex-row items-center gap-x-4 font-aeonik-bold">
        <Button onClick= { () => updateCount(false) }>-</Button>
        <p>{count}</p>
        <Button onClick= { updateCount } >+</Button>
    </div>
}