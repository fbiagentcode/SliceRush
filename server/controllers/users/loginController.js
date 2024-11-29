import Users from "../../models/user.js";
import genToken from "../../utils/genToken.js";
export default async function loginController(req, res, next){
    const { body: {email, password} } = req;
   
    // send back error if credentials not provided
    if (!email || !password) 
        return next({err: "Email and password are required.", code: 409});

    const user = await Users.login(email, password);

    if (user) {
        const { _id, role, name, email, imageUrl, orders } = user;

        console.log(`${user.name} logged in at ${Date(Date.now())}`);

        // create jwt auth token and send user
        return res.cookie("auth", genToken({_id, role, name, email, imageUrl}), 
        {maxAge: 3600*1000, httpOnly: true, secure: false})
        .json({_id, role, name, email, imageUrl, orders});
    }
    next({err: "Email or password incorrect.", code: 401});
}