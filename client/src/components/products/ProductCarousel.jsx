import { Carousel, CarouselNext, CarouselPrevious, CarouselContent } from "../ui/carousel";
import StockCounter from "./StockCounter";
import Product from "./Product";
export default function ProductCarousel({products, onItemClick, onStockChange}){
    return <Carousel>
        <CarouselContent>
            { products.map((product, i) => (<Product 
                key= {i}
                product= { {...product} }
                onClick= { onItemClick && (() => onItemClick(product)) }
            >
                { onStockChange && <StockCounter setQty= {onStockChange} product= {product} /> }
            </Product>)) }
        </CarouselContent>
        <CarouselNext/>
        <CarouselPrevious/>
    </Carousel>
}