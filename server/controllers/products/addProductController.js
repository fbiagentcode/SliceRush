import supabase from "@supabase/supabase-js";
import pizzaVariants from "../../models/pizzaVariety.js";
import Ingredients from "../../models/ingredient.js";

const supabaseClient = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function addProductController(req, res, next){
    const bucket_id = "images";
    const bucket = supabaseClient.storage.from(bucket_id);
    const { pizzaVariety } = req.query;
    const { body } = req;
    const file = req.file;
    const path = `/products/${file.originalname}`;
    let imageUrl = null;

    try{
        if(file){
            // upload product image to supabase bucket
            const { data, error } = await bucket.upload(path, file.buffer, file.mimetype);

            if (error) throw error;
            imageUrl = data.path;
        }
        // default url
        else imageUrl = `${bucket_id}/products/${pizzaVariety? "pizzaVariety" : "ingredient"}Shadow.png`;

        // get uploaded image's supabase url
        const { data: {publicUrl} } = bucket.getPublicUrl(imageUrl);
        body.imageUrl = publicUrl;

        // store product in db
        const product = !pizzaVariety? await Ingredients.create(body) : await pizzaVariants.create(body);
        res.json(product);

        console.log(`New PRODUCT added at ${Date(Date.now())}`, product);
        
    }catch(err){
        const { data, error } = await bucket.remove(path);
        if (error) console.log(error);
        next(err);
    }
}