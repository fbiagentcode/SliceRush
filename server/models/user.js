import mongoose from "mongoose";
import validator from "validator";
import hideEmail from "../utils/hideEmail.js";
import bcrypt from "bcrypt";

const USER_SCHEMA = new mongoose.Schema({
	role: { type: String, enum: ["customer", "admin"], default: "customer" },
	email: { 
        type: String, 
        required: true, 
        unique: true, 
        set: (v) => v.toUpperCase(),
        get: hideEmail, 
        validate: [(email) => validator.isEmail(email), "Invalid email format."]
    },
	name: { type: String, required: true },
	password: { type: String, required: true },
    imageUrl: { type: String },
	orders: [mongoose.SchemaTypes.ObjectId]
});

USER_SCHEMA.pre("save", async function(next){
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 10);
    next();
});

USER_SCHEMA.statics.login = async function login(email, password){
    const user = await this.findOne({email});
    if (!user) return null;
    return await bcrypt.compare(password, user.password) && user;
};

export default mongoose.model("User", USER_SCHEMA);