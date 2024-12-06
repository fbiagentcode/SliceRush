import { useState, useEffect } from "react";

import { Button } from "../ui/button";

/** A counter component for product stock */
export default function StockCounter({setQty}){
    const [ count, setCount ] = useState(0);

    useEffect(() => {
        setQty(count);
    }, [count])

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