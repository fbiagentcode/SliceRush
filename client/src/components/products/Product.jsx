import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** A card component for a product */
export default function Product({product: {name, description, imageUrl, stock}, onClick, displayStock= false, children}){
    return <Card onClick= {onClick}>
        <CardHeader>
            <h1>{name}</h1>
        </CardHeader>
        <CardContent>
            <p>{description}</p>
            <img src= {imageUrl} alt= {name} />
        </CardContent>
        <CardFooter>
            { displayStock && <ProductStockDetails stock= {stock} /> }
            {children}
        </CardFooter>
    </Card>
}

function ProductStockDetails({stock}){
    return (<div>
        <div>
            <p>Current stock: </p>
            <p>{stock.amount}</p>
        </div>
        <div>
            <p>Threshold: </p>
            <p>{stock.threshold}</p>
        </div>
    </div>);
}

