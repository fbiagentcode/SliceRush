import supabase from "@supabase/supabase-js";
import pizzaVariants from "../../models/pizzaVariety.js";
import Ingredients from "../../models/ingredient.js";

const supabaseClient = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function addProductController(req, res){
    try{
        const { type= "ingredient" } = req.query;
        const { body } = req;
        const file = req.file;

        if(file){
            const bucket_id = "images";
            const bucket = supabaseClient.storage.from(bucket_id);
            const path = `/products/${file.originalname}`;
            // upload product image to supabase bucket
            const { data, error } = await bucket.upload(path, file.buffer, file.mimetype);

            if (error) throw error;
            body.imageUrl = data.fullPath;
        }
        // default url
        else body.imageUrl = `${bucket_id}/products/${type}shadow.png`;
        // store product in db
        const product = type === "ingredient"? await Ingredients.create(body) : await pizzaVariants.create(body);
        res.json(product);
        console.log("NEW PRODUCT ADDED!", product);
    }catch(err){
        res.status(err.code || 500).json({errors: err});
        console.log(err);
    }
}