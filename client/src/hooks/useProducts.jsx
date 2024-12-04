import { useState, useEffect, useRef } from "react";
import useFetch from "./useFetch";

const origin = import.meta.env.VITE_ORIGIN;

/** Fetch products hook */
export default function useProducts(pizzaVarieties= false){
    const { fetchHandler, isLoading, error } = useFetch();
    const controller = useRef();
    const [ products, setProducts ] = useState([]);

    const fetchProducts = async () => {
        const type = pizzaVarieties? "pizzaVarieties" : "ingredients";
        const result = await fetchHandler(`${origin}/products/${type}/`, controller.current.signal);
        if (result) setProducts(result);
    }

    useEffect(() => {
        controller.current = new AbortController();
        fetchProducts();

        return () => controller.current.abort();
    }, []);

    return { products, isLoading, error };
}