import jwt from "jsonwebtoken";
import Users from "../../models/user.js";
export default async function resetPasswordController(req, res, next){
    try{
        const { token } = req.query;
        const { password } = req.body;

        // verify token
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!user) return next({err: "Authorization to reset password denied - Token not found.", code: 401});
       
        // reset password
        const { email } = user;
        if(await Users.findOneAndUpdate({email}, {password}))
            return res.json({
                success: true, 
                message: "Your password has been successfully reset. You can now log in with your new password."
            });
        next({err: "Account with that email does not exist. Create a new account.", code: 400});
    }
    catch(err){
        next(err);
    }

}