import mongoose from "mongoose";

const INGREDIENT_SCHEMA = new mongoose.Schema({
    category: String, 
    name: String,
    description: String,
    imageurl: String,
    price: {
        amount: Number,
        currency: String
    },
    stock: {
        amount: Number,
        threshold: Number
    },
    isAvailable: Boolean
});

export default mongoose.model("Ingredient", INGREDIENT_SCHEMA);