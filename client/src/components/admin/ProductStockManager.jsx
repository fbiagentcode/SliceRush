import { useState, useEffect, useRef, useMemo, useContext } from "react";
import useFetch from "../../hooks/useFetch";

import { resetCountersContext } from "../../contexts/ResetCountersContext";
import ProductCarousel from "../products/ProductCarousel";
import { Button } from "../ui/button";
import ButtonLoading from "../ui/ButtonLoading";
import { Card, CardContent, CardHeader } from "../ui/card";

const origin = import.meta.env.VITE_ORIGIN;

export default function ProductStockManager({products, setProducts}){
    const { fetchHandler, isLoading, error } = useFetch();
    const { setResetCounters } = useContext(resetCountersContext);
    const controller = useRef();
    const [ stockUpdates, setStockUpdates ] = useState([]);
    const [ success, setSuccess ] = useState(false);
    const [ changesMade, setChangesMade ] = useState(false);

    // update item stock
    const updateStock = (qty, {_id}) => {
        setResetCounters({reset: false});
        // modify update list
        setStockUpdates(updates => {
            const updatedItems = new Map(updates.map((product) => [product._id, product]));

            // update stock if ingredient already in update list
            if(updatedItems.has(_id) && qty){
                updatedItems.get(_id).qty = qty;
                return updates;
            }

            // remove item from update list if qty is set to 0
            if (!qty) return updates.filter(({_id: itemId}) => itemId !== _id);

            // add to updates
            return [...updates, {_id, qty: 1}];
        });
    };

    // update stock on server
    const saveChanges = async () => {
        // reset success state
        setSuccess(false);
        const result = await fetchHandler(`${origin}/products/ingredients/stock`, controller.current.signal,
        {
            method: "PUT",
            body: JSON.stringify(stockUpdates),
            headers: { "Content-Type": "application/json" }
        });
        if (result){
            const updatedProducts = new Map(stockUpdates.map(({_id, qty}) => [_id, qty]));
            // update products state
            setProducts(products.map(product => {
                if (updatedProducts.has(product._id))
                    product.stock.amount += updatedProducts.get(product._id);
                return product;
            }));
            // clear update list
            setStockUpdates([]);
            // reset changes made flag
            setChangesMade(false);
            // set success
            setSuccess(true);
            // reset qty counters
            setResetCounters({reset: true});
        }

    };

    // toggle changes made when updates list changes
    useEffect(() => {
       setChangesMade(Boolean(stockUpdates.length)); 
    }, [stockUpdates]);

    useEffect(() => {
        controller.current = new AbortController();

        return () => controller.current.abort();
    }, []);

    // get non - low stock products by category 
    const filterProducts = (category) => (
        products.filter((item) => item.category === category && !lowStockItems.includes(item))
    );

    // store items with low stock
    const lowStockItems = useMemo(() => (
        products.filter((item) => item.stock?.amount <= item.stock?.threshold)
    ), [products]);

    const cheeses = useMemo(() => filterProducts("cheese"), [products]);
    const bases = useMemo(() => filterProducts("base"), [products]);
    const sauces = useMemo(() => filterProducts("sauce"), [products]);
    const veggies = useMemo(() => filterProducts("veggie"), [products]);

    return (<Card className= "bg-grey-900 text-grey-50 border-none">
        <CardHeader className= "flex flex-col items-center gap-y-4 ">
            { error && <p>{error.errors}</p> }
            { success && <p>Changes saved successfully.</p> }
            { changesMade && (isLoading? <ButtonLoading/> : 
            <Button className= "text-xl py-7 px-20" onClick= {saveChanges}>Save</Button>) }
        </CardHeader>
        <CardContent className= "text-white-50">
            { lowStockItems[0] && <>
                <h2 className= "text-white text-lg p-4">LOW STOCK ITEMS</h2>
                <p className= "p-4">These items need urgent restocking.</p>
                <ProductCarousel className= "md:basis-1/2 lg:basis-1/4" products= {lowStockItems} onStockChange= {updateStock} displayStock= {true}/> 
            </> }
            <h2 className= "text-white text-lg mt-4 p-4">Cheeses</h2>
            <ProductCarousel className= "md:basis-1/2 lg:basis-1/4" products= {cheeses} onStockChange= {updateStock} displayStock= {true}/>

            <h2 className= "text-white text-lg mt-4 p-4">Bases</h2>
            <ProductCarousel className= "md:basis-1/2 lg:basis-1/4" products= {bases} onStockChange= {updateStock} displayStock= {true}/>

            <h2 className= "text-white text-lg mt-4 p-4">Sauces</h2>
            <ProductCarousel className= "md:basis-1/2 lg:basis-1/4" products= {sauces} onStockChange= {updateStock} displayStock= {true}/>

            <h2 className= "text-white text-lg mt-4 p-4">Veggies</h2>
            <ProductCarousel className= "md:basis-1/2 lg:basis-1/4" products= {veggies} onStockChange= {updateStock} displayStock= {true}/>
        </CardContent>
    </Card>);
}

