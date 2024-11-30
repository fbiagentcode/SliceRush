import { createClient } from "@supabase/supabase-js";
import Ingredients from "../../models/ingredient.js";
import pizzaVarieties from "../../models/pizzaVariety.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export function deletePizzaVarietiesController(req, res, next){
    deleteProductsController(pizzaVarieties, req, res, next);
}

export function deleteIngredientsController(req, res, next){
    deleteProductsController(Ingredients, req, res, next);
}

async function deleteProductsController(productType, req, res, next){
    if (!req.query.id) return next({err: "Product ids not specified", code: 400});

    const bucketId = "images";
    const bucket = supabaseClient.storage.from(bucketId);
    const productIds = req.query.id?.split(",");

    const products = await productType.find({ _id: { $in: productIds } });
    
    // get path from urls stored for images and delete 
    const imagePaths = products.map(({ imageUrl }) => imageUrl.split(bucketId + "/")[1]);
    const { error } = await bucket.remove(imagePaths);
    if (error) return next(error);
    
    // delete products
    const deleted = await productType.deleteMany({ _id: { $in: productIds } });
    res.json(deleted);

    console.log(deleted);
}   