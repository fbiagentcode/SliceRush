import { createClient } from "@supabase/supabase-js";
import Users from "../../models/user.js";
import sendConfirmationMail from "../../utils/sendConfirmationMail.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function signUpController(req, res, next){
    const { body } = req;
    const bucket_id = "images";
    const bucket = supabaseClient.storage.from(bucket_id);

    try{
        
        // default img url
        const imageUrl = `users/userIconShadow.jpg`; 

        // get image's public url & store in db
        const { data: {publicUrl} } = bucket.getPublicUrl(imageUrl);
        body.imageUrl = publicUrl

        // create user
        let user = await Users.create({expiresAt: Date.now() + 7200*1000, ...body});

        // send mail
        sendConfirmationMail(user);

        res.json({success: true, message: "Account created. Check your email for a confirmation link to complete registration."});
        console.log(`New user created at ${Date(Date.now())}`, user);
        
    }catch(err){
        next(err);
    }
}