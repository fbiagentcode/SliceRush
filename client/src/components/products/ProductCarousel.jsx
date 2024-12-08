import { Carousel, CarouselItem, CarouselNext, CarouselPrevious, CarouselContent } from "../ui/carousel";
import StockCounter from "./StockCounter";
import Product from "./Product";
export default function ProductCarousel({products, onItemClick, onStockChange, displayStock}){
    return <Carousel className= "w-full">
        <CarouselContent>
            { products.map((product, i) => (
                <CarouselItem className= "md:basis-1/2 lg:basis-1/4">
                    <Product 
                        key= {i}
                        product= { {...product} }
                        onClick= { onItemClick && (() => onItemClick(product)) }
                        displayStock= {displayStock}
                    >
                        { onStockChange && <StockCounter setQty= {onStockChange} product= {product} /> }
                    </Product>
                </CarouselItem>)) }
        </CarouselContent>
        <CarouselNext className= "absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-grey-500 text-white rounded-full p-4 shadow-lg "/>
        <CarouselPrevious className= "absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-grey-500 text-white rounded-full p-4 shadow-lg " />
    </Carousel>
}