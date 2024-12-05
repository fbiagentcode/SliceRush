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
        setCount((prev) => prev + value);
    }

    return <div>
        <Button onClick= { () => updateCount(inc= false) }>-</Button>
        <p>{count}</p>
        <Button onClick= { updateCount } >+</Button>
    </div>
}