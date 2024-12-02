import { createClient } from "@supabase/supabase-js";
import Users from "../../models/user.js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function deleteUserByIdController(req, res, next){
    try{
        const { user } = req;
        const { userId: id } = req.params;
        const bucketId = "images";
        const bucket = supabaseClient.storage.from(bucketId);

        if (user.role === "admin" || user._id === id){
            // delete account
            const deleted = await Users.findByIdAndDelete(id);

            if (!deleted) return next({err: "Account does not exist.", code: 404});
            
            const imagePath =  deleted.imageUrl.split(bucketId + "/")[1];
            // delete pfp
            const { error } = await bucket.remove(imagePath);
            if (error) return next(error);

            console.log("Deleted account" , deleted.email , "at", Date(Date.now()));
            res.json(deleted);
        }
        next({err: "Not authorized to delete user's account", code: 401});
    }
    catch(err){
        next(err);
    }
}