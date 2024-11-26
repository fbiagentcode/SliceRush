import mongoose from "mongoose";

const INGREDIENT_SCHEMA = new mongoose.Schema({
    category: { type: String, required: true }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "/ingredients/ingredientShadow.png" },
    price: {
        amount: { type: Number, required: true },
        currency: {
            type: String,
            default: "INR",
            set: (v) => v.toUpperCase()
        }
    },
    stock: {
        amount: { type: Number, required: true },
        threshold: { type: Number, required: true }
    },
    isAvailable: { type: Boolean, required: true }
});

export default mongoose.model("Ingredient", INGREDIENT_SCHEMA);