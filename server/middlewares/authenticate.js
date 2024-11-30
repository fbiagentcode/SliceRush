import jwt from "jsonwebtoken";
export default function authenticate(req, res, next){
    const err = {err: "Authentication token not found.", code: 401};
    const { auth } = req.cookies;
    if (auth){
        const decoded = jwt.verify(auth, process.env.JWT_SECRET_KEY);
        if(decoded){
            req.user = decoded;
            return next();
        }
    }
    next(err);
}