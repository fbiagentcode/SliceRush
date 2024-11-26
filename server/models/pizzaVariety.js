import mongoose from "mongoose";

const PIZZA_VARIETY_SCHEMA = new mongoose.Schema({
    name: String,
	ingredients: [mongoose.SchemaTypes.ObjectId],
	description: String,
	imageUrl: String,
    isAvailable : Boolean
});

export default mongoose.model("PizzaVariety", PIZZA_VARIETY_SCHEMA);