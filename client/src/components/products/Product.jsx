import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

/** A card component for a product */
export default function Product({product: {name, description, imageUrl}, children}){
    return <Card>
        <CardHeader>
            <h1>{name}</h1>
        </CardHeader>
        <CardContent>
            <p>{description}</p>
            <img src= {imageUrl} alt= {name} />
        </CardContent>
        <CardFooter>
            {children}
        </CardFooter>
    </Card>
}

