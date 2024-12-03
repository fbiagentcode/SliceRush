import Users from "../../models/user.js";
import sendConfirmationMail from "../../utils/sendConfirmationMail.js";
export default async function resendConfirmationController(req, res, next){
    try{
        const user = req.body;

        const account = await Users.findOne({email: user.email});
        if (!account) return next({err: "Please create an account before attempting to confirm registration.", code: 400});
        if (!account.expiresAt) return next({err: "Account registration is already complete", code: 400}); 
    
        // send mail
        console.log(user, 1);
        sendConfirmationMail(user);
        return res.json({success: true, message: "Mail sent. Check your email for a confirmation link to complete registration."});        
    
    }catch(err){
        next(err);
    }
}