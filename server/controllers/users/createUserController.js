import { createClient } from "@supabase/supabase-js";
import Users from "../../models/user.js";
import genToken from "../../utils/genToken.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function createUserController(req, res, next){
    const { body } = req;
    const bucket_id = "images";
    const bucket = supabaseClient.storage.from(bucket_id);
    const file = req.file;
    const path = `/users/${file?.originalname}`;
    let imageUrl = null;
    try{
        let user = await Users.create(body);

        if(file){
            // upload product image to supabase bucket
            const { data, error } = await bucket.upload(path, file.buffer, file.mimetype);

            if (error) throw error;
            imageUrl = data.path;
        }
        // default url
        else imageUrl = `users/userIconShadow.jpg`; 

        // get image's public url & store in db
        const { data: {publicUrl} } = bucket.getPublicUrl(imageUrl);
        user.imageUrl = publicUrl
        user = await user.save();

        // get jwt 
        const auth = genToken({
            role: user.role,
            _id: user._id, 
            name: user.name,
            imageUrl: user.imageUrl, 
        });

        res.cookie("auth", auth, {maxAge: 3600*1000, httpOnly: true, secure: false})
        .json(user);

        console.log(`New user created at ${Date(Date.now())}`, user);
        
    }catch(err){
        const { data, error } = await bucket.remove(path);
        if (error) console.log(error);
        next(err);
    }
}