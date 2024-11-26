import mongoose from "mongoose";

const Order = new mongoose.Schema({
	placed_at: Date,
	total: {
        amount: Number,
        currency: String
    },
	user_id: Objectid,
	destination: String,
	products: [{
		product_id: mongoose.SchemaTypes.ObjectId,
		qty: Number
    }],
	status: {
        type: String,
        enum: ["received", 
    }
});

export default mongoose.model("Order", ORDER_SCHEMA);