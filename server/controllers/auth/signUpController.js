import { createClient } from "@supabase/supabase-js";
import Users from "../../models/user.js";
import sendMail from "../../utils/sendMail.js";
import genToken from "../../utils/genToken.js";

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

        // get jwt 
        const auth = genToken({
            role: user.role,
            _id: user._id, 
            name: user.name,
            imageUrl: user.imageUrl, 
        });

        // res.cookie("auth", auth, {maxAge: 3600*1000, httpOnly: true, secure: false})
        // .json(user);
        const link = `${process.env.ORIGIN}/auth/confirmation?token=${auth}`;
        const mail = {
            to: body.email,
            subject: "Confirm your Slice Rush account registration",
            content: `<h1>Your Slice Rush account is almost complete!</h1>
            <p>Click this link to complete registration. Link will be valid only for the next hour. 
            <a href=${link}>${link}</a>`
        };

        // send confirmation
        sendMail(mail);

        res.json({success: true, message: "Account created. Check your email for a confirmation link to complete registration."});
        console.log(`New user created at ${Date(Date.now())}`, user);
        
    }catch(err){
        next(err);
    }
}