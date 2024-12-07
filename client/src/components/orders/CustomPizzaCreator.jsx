import { useState, useContext, useMemo } from "react";

import { cartContext } from "../../contexts/CartContext";
import ProductCarousel from "../products/ProductCarousel";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function CustomPizzaCreator({products, setOpen}){
    const { setCart } = useContext(cartContext);
    const [ error, setError ] = useState(null);
    // states for selected ingredients
    const [ cheese, setCheese ] = useState(null);
    const [ base, setBase ] = useState(null);
    const [ sauce, setSauce ] = useState(null);
    const [ veggiesAdded, setVeggiesAdded ] = useState([]);
    
    // filter products by category
    const filterProducts = (category) => products.filter((item) => item.category === category)

    const cheeses = useMemo(() => filterProducts("cheese"), [products]);
    const bases = useMemo(() => filterProducts("base"), [products]);
    const sauces = useMemo(() => filterProducts("sauce"), [products]);
    const veggies = useMemo(() => filterProducts("veggie"), [products]);

    const addVeggie = (newVeggie) => {
        // remove veggie if already selected
        if (newVeggie in veggiesAdded){
            return setVeggiesAdded(veggiesAdded.filter((veggie) => veggie !== newVeggie));
        }
        setVeggiesAdded([...veggiesAdded, newVeggie]);
    };

    const addPizza = () => {
        const errors = {};
        if (!base) errors["base"] = ingredientErrorMsg("base");
        if (!cheese) errors["cheese"] = ingredientErrorMsg("cheese");
        if (!sauce) errors["sauce"] = ingredientErrorMsg("sauce");
        if (!veggiesAdded.length) errors["veggies"] = ingredientErrorMsg("veggie");
        if (Object.keys(errors).length) return setError(errors);

        setCart((cart) => {
            // update cart total
            cart.amount = cheese.price?.amount + 
            sauce.price?.amount + 
            base.price?.amount + 
            veggiesAdded.reduce((sum, {price: {amount}}) => sum + amount, cart.amount);
            
            const cartItems = new Map(cart.products.map((product) => [product._id, product]));

            const pizzaIngredients = [cheese, base, sauce, ...veggiesAdded];
            
            pizzaIngredients.forEach(({_id, name}) => {
                // update stock if ingredient already in cart
                if(cartItems.has(_id)){
                    cartItems.get(_id).qty += 1;
                    return;
                }
                // add to cart
                cart.products.push({_id, name, qty: 1});

                // update map
                cartItems.set(_id, {_id, name, qty: 1})
            }); 

            return {amount: cart.amount, products: cart.products};
        });
        setOpen(false);
    };

    return <Card>
        <CardContent>
            <p>Start by picking a base.</p>
            <ProductCarousel products= {bases} onItemClick= {(base) => setBase(base)}/>
            { error?.base && <p>{error.base}</p> }

            <p>Pick a cheese type.</p>
            <ProductCarousel products= {cheeses} onItemClick= {(cheese) => setCheese(cheese)}/>
            { error?.cheese && <p>{error.cheese}</p> }

            <p>Now for the sauce.</p>
            <ProductCarousel products= {sauces} onItemClick= {(sauce) => setSauce(sauce)}/>
            { error?.sauce && <p>{error.sauce}</p> }

            <p>Finally, veggies.</p>
            <ProductCarousel products= {veggies} onItemClick= {addVeggie}/>
            { error?.veggies && <p>{error.veggies}</p> }
        </CardContent>
        <CardFooter>
            <Button onClick= {addPizza}>Craft your pizza</Button>
        </CardFooter>
    </Card>
}

// display msg if ingredient not selected
const ingredientErrorMsg = (type) => `Please select a ${type}.`;