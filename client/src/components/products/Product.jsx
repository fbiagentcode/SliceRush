import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** A card component for a product */
export default function Product({product: {name, description, imageUrl, stock}, onClick, displayStock= false, children, className}){
    return <Card onClick= {onClick} className=  {`${className} flex flex-col justify-stretch bg-gradient-to-tr from-grey-500 from-5% via-grey-100 from 5% to-black rounded-2xl shadow-lg max-w-sm p-6 text-white border-none`}>
        <CardHeader className= "">
            <h1 className= "text-xl tracking-tight">{name}</h1>
        </CardHeader>
        <CardContent className= "flex flex-col justify-end overflow-hidden rounded-lg grow">
            <p className= "mb-4 text-grey-10">{description}</p>
            <img src= {imageUrl} alt= {name} className= "w-full "/>            
        </CardContent>
        <CardFooter className= "p-4border-grey flex flex-col items-center">
            { displayStock && <ProductStockDetails stock= {stock} /> }
            {children}
        </CardFooter>
    </Card>
}

function ProductStockDetails({stock}){
    return (<div className= "flex flex-col justify-center gap-1 mb-4 text-sm text-grey-10">
        <div className= "grid grid-cols-2 place-items-center">
            <p className= "font-medium text-grey-50">Current stock: </p>
            <p>{stock.amount}</p>
        </div>
        <div className= "grid grid-cols-2 place-items-center">
            <p className= "font-medium text-grey-50">Threshold: </p>
            <p>{stock.threshold}</p>
        </div>
    </div>);
}

