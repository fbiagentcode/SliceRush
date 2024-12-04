import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

/** A card component for a product */
export default function Product({product: {name, description, imageUrl}, setCount, count}){
    return <Card>
        <CardHeader>
            <h1>{name}</h1>
        </CardHeader>
        <CardContent>
            <p>{description}</p>
            <img src= {imageUrl} alt= {name} />
        </CardContent>
        <CardFooter>
            <StockCounter setCount= {setCount} count= {count}/>
        </CardFooter>
    </Card>
}

/** A counter component for product stock */
function StockCounter({setCount, count}){
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