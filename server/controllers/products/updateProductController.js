import { createClient } from "@supabase/supabase-js";
import Ingredients from "../../models/ingredient.js";
import pizzaVarieties from "../../models/pizzaVariety.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export async function updateIngredientByIdController(req, res, next){
    const { id } = req.params;
    updateProductController(Ingredients, id, req.body, req, res, next);
}

export async function updatePizzaVarietyByIdController(req, res, next){
    const { id } = req.params;
    updateProductController(pizzaVarieties, id, req.body, req, res, next);
}

async function updateProductController(productType, id, update, req, res, next){
    const { user } = req;
    if (user.role !== "admin") return next({err: "Not authorized to update products. Contact admin.", code: 401});
    
    try{
    // check if product exists
        const product = await productType.findById(id);

        if (!product){
            return next({err: "Product does not exist.", code: 404});
        }

        // handle image updates
        const { file } = req;
        if (file){
            const bucketId = "images";
            const bucket = supabaseClient.storage.from(bucketId);
            const oldPath = product.imageUrl?.split(bucketId + "/")[1];

            // replace img
            const { data, error } = await bucket.update(oldPath, file.buffer, { upsert: true });
            
            if (error) return next({err: error, code: 1*error.statusCode});
            
            const { data: {publicUrl} } = bucket.getPublicUrl(data.path);
            update.imageUrl = publicUrl;
        }
        // update product
        const updatedProduct = await productType.findByIdAndUpdate(id, update, { returnDocument: "after" });
        res.json(updatedProduct);
        console.log("Updated a product:", updatedProduct);
    }
    catch(err){
        return next(err);
    }
}
