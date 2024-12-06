import mongoose from "mongoose";

const PIZZA_VARIETY_SCHEMA = new mongoose.Schema({
    name: { type: String, required: true },
	ingredients: { 
        type: [mongoose.SchemaTypes.ObjectId], 
        ref: "Ingredient", 
        required: true,
        set: (ids) => ids.split(",").map(id => id instanceof mongoose.Types.ObjectId? id : 
            new mongoose.Types.ObjectId(`${id}`))
    },
	description: { type: String, required: true },
	imageUrl: { type: String },
	total: {
        amount: { type: Number, required: true },
        currency: {
            type: String,
            default: "INR",
            set: (v) => v.toUpperCase()
        }
    },
    isAvailable : { type: Boolean, required: true }
});

export default mongoose.model("PizzaVariety", PIZZA_VARIETY_SCHEMA);