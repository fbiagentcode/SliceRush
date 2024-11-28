import pizzaVarieties from "../../models/pizzaVariety.js";
import Ingredients from "../../models/ingredient.js";
export async function viewIngredientsController(req, res){
    const filter = {type: req.query.type};
    viewProducts(Ingredients, filter, req, res);
}

export async function viewPizzaVarietiesController(req, res){
    viewProducts(pizzaVarieties, null, req, res);
}

async function viewProducts(productType, filter, req, res){
    const products = await productType.find(filter);
    res.json(products);
    console.log(products);
}