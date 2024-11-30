import mongoose from "mongoose";

const INGREDIENT_SCHEMA = new mongoose.Schema({
    category: { 
        type: String, 
        required: true, 
        index: true, 
        enum: ["base", "cheese", "veggie", "sauce"],
        set: (v) => v.toLowerCase() 
    }, 
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
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

INGREDIENT_SCHEMA.post("updateOne", async function(res, next){
    const filter = this.getFilter();
    const session = this.getOptions().session

    const ingredient = await this.model.findOne(filter);
    if (!ingredient) return next();
    if (ingredient.stock?.amount <= 0){
        ingredient.isAvailable = false;
        await ingredient.save({session});
    }
    next();
});

export default mongoose.model("Ingredient", INGREDIENT_SCHEMA);

