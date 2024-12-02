import genToken from "../../utils/genToken.js";
import sendMail from "../../utils/sendMail.js";
export default function forgotPasswordController(req, res, next){
    try{
        const { email } = req.params;
        // get token
        const token = genToken({email});
    
        const link = `${process.env.ORIGIN}/reset-password?token=${token}`;
        const mail = {
            to: email,
            subject: "Slice Rush - Confirm password reset",
            content: `<h1>Reset your password now</h1>
            <p>by clicking this link <a href=${link}>${link}</a>. Link expires in one hour. </p>`
        };
        // send reset password link in mail
        sendMail(mail);
        res.json({ success: true, message: "Check the mail address for reset password link. Check spam folder or retry again later if link is not in inbox."});
    }
    catch(err){
        next(err);
    }
}