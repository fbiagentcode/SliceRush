import { Carousel, CarouselNext, CarouselPrevious, CarouselContent } from "../ui/carousel";
import Product from "./Product";
export default function ProductList({products, onItemClick, children}){
    return <Carousel>
        <CarouselContent>
            { products.map((product, i) => (<Product 
                key= {i}
                product= { {...product} }
                onClick= { () => onItemClick(product) }
            >
                {children}
            </Product>)) }
        </CarouselContent>
        <CarouselNext/>
        <CarouselPrevious/>
    </Carousel>
}