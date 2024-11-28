import jwt from "jsonwebtoken";
export default function genToken(user){
    return jwt.sign(user, process.env.JWT_SECRET_KEY, {expiresIn: "1h", issuer: "Slice Rush"}); 
}