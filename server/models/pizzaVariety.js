import mongoose from "mongoose";

const PIZZA_VARIETY_SCHEMA = new mongoose.Schema({
    name: { type: String, required: true },
	ingredients: { type: [mongoose.SchemaTypes.ObjectId], ref: "Ingredient", required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, default: "/varieties/pizzaShadow.png" },
    isAvailable : { type: Boolean, required: true }
});

export default mongoose.model("PizzaVariety", PIZZA_VARIETY_SCHEMA);