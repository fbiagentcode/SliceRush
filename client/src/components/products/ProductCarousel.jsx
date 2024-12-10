import { Carousel, CarouselItem, CarouselNext, CarouselPrevious, CarouselContent } from "../ui/carousel";
import StockCounter from "./StockCounter";
import Product from "./Product";
export default function ProductCarousel({products, onItemClick, onStockChange, displayStock, className}){
    return <Carousel opts={{align: "start"}} className= "w-full">
        <CarouselContent >
            { products.map((product, i) => (
                <CarouselItem key= {i} className= {"mb-0" + className || "md:basis-1/2 lg:basis-1/4"}>
                    <Product 
                        
                        product= { {...product} }
                        onClick= { onItemClick && (() => onItemClick(product)) }
                        displayStock= {displayStock}
                    >
                        { onStockChange && <StockCounter setQty= {onStockChange} product= {product} /> }
                    </Product>
                </CarouselItem>)) }
        </CarouselContent>
        <div className="my-5 ml-10 flex flex-row justify-center">
            <CarouselPrevious className= "m-0 z-10 bg-grey-500 text-white rounded-full p-4 shadow-lg " />
            <CarouselNext className= " z-10 bg-grey-500 text-white rounded-full p-4 shadow-lg "/>
        </div>
    </Carousel>
}