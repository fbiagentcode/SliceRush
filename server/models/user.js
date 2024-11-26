import mongoose from "mongoose";
import validator from "validator";
import hideEmail from "../utils/hideEmail.js";

const USER_SCHEMA = new mongoose.Schema({
	role: { type: String, enum: ["customer", "admin"], default: "customer" },
	email: { 
        type: String, 
        required: true, 
        unique: true, 
        get: hideEmail, 
        validate: [(email) => validator.isEmail(email), "Invalid email format."]
    },
	name: { type: String, required: true },
	password: { type: String, required: true },
    imageUrl: { type: String, default: "/profiles/profilePictureShadow.png" },
	orders: [mongoose.SchemaTypes.ObjectId]
});

export default mongoose.model("User", USER_SCHEMA);