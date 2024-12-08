import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** A card component for a product */
export default function Product({product: {name, description, imageUrl, stock}, onClick, displayStock= false, children}){
    return <Card onClick= {onClick} className= "bg-gradient-to-r from-grey-500  via-grey-100 to-black-50 rounded-lg shadow-lg max-w-sm p-6 text-white">
        <CardHeader className= "">
            <h1 className="text-xl tracking-tight">{name}</h1>
        </CardHeader>
        <CardContent className="overflow-hidden rounded-lg">
            <p className="mb-4 text-grey-10">{description}</p>
            <img src= {imageUrl} alt= {name} className= "w-full object-cover "/>
        </CardContent>
        <CardFooter className="p-4 border-gray-700">
            { displayStock && <ProductStockDetails stock= {stock} /> }
            {children}
        </CardFooter>
    </Card>
}

function ProductStockDetails({stock}){
    return (<div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
        <div>
            <p className="font-medium text-grey-10">Current stock: </p>
            <p>{stock.amount}</p>
        </div>
        <div>
            <p className="font-medium text-grey-10">Threshold: </p>
            <p>{stock.threshold}</p>
        </div>
    </div>);
}

