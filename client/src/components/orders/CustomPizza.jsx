import { useState, useMemo } from "react";

import ProductList from "../products/ProductList";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function CustomPizza({products, setCart}){
    const [ error, setError ] = useState(null);
    // states for selected ingredients
    const [ cheese, setCheese ] = useState(null);
    const [ base, setBase ] = useState(null);
    const [ sauce, setSauce ] = useState(null);
    const [ veggiesAdded, setVeggiesAdded ] = useState([]);
    
    // filter products by category
    const filterProducts = (category) => products.filter((item) => item.category === category)

    const cheeses = useMemo(filterProducts("cheese"), [products]);
    const bases = useMemo(filterProducts("base"), [products]);
    const sauces = useMemo(filterProducts("sauce"), [products]);
    const veggies = useMemo(filterProducts("veggie"), [products]);

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
        if (!veggies.length) errors["veggies"] = ingredientErrorMsg("veggie");
        if (!Object.keys(errors).length) return setError(errors);

        setCart((cart) => {
            // update cart total
            cart.amount = cheese.price?.amount + 
            sauce.price?.amount + 
            base.price?.amount + 
            veggies.reduce((sum, {price: {amount}}) => sum + amount, 0);
            
            const cartItems = new Map(cart.products.map((product) => [product._id, product]));

            const veggieIds = veggies.map(({_id}) => _id);
            const ids = [cheese._id, base._id, sauce._id, ...veggieIds];
            
            ids.forEach((id) => {
                // update stock if ingredient already in cart
                if(cartItems.has(id)){
                    cartItems.get(id).qty += 1;
                    return;
                }
                // add to cart
                cart.products.push({_id: id, qty: 1});

                // update map
                cartItems.set(id, {id, qty: 1})
            }); 

            return {amount: cart.amount, ...cart.products};
        });
    };

    return <Card>
        <CardHeader>
            <h1>Customize your pizza!</h1>
        </CardHeader>
        <CardContent>
            <p>Start by picking a base.</p>
            <ProductList products= {bases} onItemClick= {(base) => setBase(base)}/>
            { error?.base && <p>{error.base}</p> }

            <p>Pick a cheese type.</p>
            <ProductList products= {cheeses} onItemClick= {(cheese) => setCheese(cheese)}/>
            { error?.cheese && <p>{error.cheese}</p> }

            <p>Now for the sauce.</p>
            <ProductList products= {sauces} onItemClick= {(sauce) => setSauce(sauce)}/>
            { error?.sauce && <p>{error.sauce}</p> }

            <p>Finally, veggies.</p>
            <ProductList products= {veggies} onItemClick= {addVeggie}/>
            { error?.veggies && <p>{error.veggies}</p> }
        </CardContent>
        <CardFooter>
            <Button onClick= {addPizza}>Craft your pizza</Button>
        </CardFooter>
    </Card>
}

const ingredientErrorMsg = (type) => `Please select a ${type}.`;