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

    // reset counter
    useEffect(() => {
        if (resetCounters?.reset) setCount(0)
    }, [resetCounters]);

    const updateCount = (inc= true) => {
        const value = inc? 1 : -1;
        // prevent negative qty
        if (count + value < 0) return;
        setCount((prev) => prev + value );
    }

    return <div>
        <Button onClick= { () => updateCount(false) }>-</Button>
        <p>{count}</p>
        <Button onClick= { updateCount } >+</Button>
    </div>
}