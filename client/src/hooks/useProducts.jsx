import { useState, useRef } from "react";
import useFetch from "./useFetch";

const origin = import.meta.env.VITE_ORIGIN;

/** Fetch products hook */
export default function useProducts(){
    const { fetchHandler, isLoading, error } = useFetch();
    const [ ingredients, setIngredients ] = useState([]);
    const [ pizzaVarieties, setPizzaVarieties ] = useState([]);

    const fetchProducts = async (signal, options= {pizzaVarieties: false}) => {
        const type = options.pizzaVarieties? "pizzaVarieties" : "ingredients";
        const result = await fetchHandler(`${origin}/products/${type}/`, signal);
        if (result){
            options.pizzaVarieties? setPizzaVarieties(result) : setIngredients(result);
            return result;
        }
    }

    return { fetchProducts, ingredients, setIngredients, pizzaVarieties, isLoading, error };
}