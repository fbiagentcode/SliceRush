import StockCounter from "./StockCounter";
import Product from "./Product";
export default function PizzaVarieties({products}){
    return <div>
        { products.map((val, i) => <Product key= {i} product= {val}>
            <StockCounter/>
        </Product>) }
    </div>
}