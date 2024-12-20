import jwt from "jsonwebtoken";
import Users from "../../models/user.js";
export default async function verificationController(req, res, next){
    try{
        const { token } = req.query;
        // verify token
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!user) return next({err: "Invalid or expired confirmation link", code: 401});

        // remove expiresAt field to prevent deletion
        const account = await Users.findOneAndUpdate(
            {$or: [
                { _id: user._id },
                { email: user.email }
            ]},
            { $unset: {expiresAt: ""} }, 
            { new: true, projection: {password: 0} }
        );
        
        if (!account) return next({err: "Please create an account before attempting to complete registration.", code: 400});
        res.json(account);
        console.log(`Account ${account.name} registration confirmed at ${Date(Date.now())}`);
    }
    catch(err){
        next(err);
    }
}