import sendMail from "./sendMail.js";
import genToken from "./genToken.js";
import jwt from "jsonwebtoken";
export default function sendConfirmationMail(user){
    // get jwt 
    const auth = genToken({
        role: user.role,
        _id: user._id, 
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl, 
    });

    console.log(jwt.decode(auth));
    
    const link = `${process.env.ORIGIN}/auth/confirmation?token=${auth}`;
    const mail = {
        to: user.email,
        subject: "Confirm your Slice Rush account registration",
        content: `<h1>Your Slice Rush account registration is almost complete!</h1>
        <p>Click this link to complete registration. Link will be valid only for the next hour. 
        <a href=${link}>${link}</a>`
    };
    
    // send confirmation
    sendMail(mail);
}
