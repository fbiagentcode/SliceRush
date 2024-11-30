import Ingredients from "../../models/ingredient.js";
import pizzaVarieties from "../../models/pizzaVariety.js";

export function deletePizzaVarietiesController(req, res, next){
    deleteProductsController(pizzaVarieties, req, res, next);
}

export function deleteIngredientsController(req, res, next){
    deleteProductsController(Ingredients, req, res, next);
}

async function deleteProductsController(productType, req, res, next){
    if (!req.query.id) return next({err: "Product ids not specified", code: 400});

    const productIds = req.query.id?.split(",");
    const deleted = await productType.deleteMany({ _id: { $in: productIds } });
    res.json(deleted);
}   