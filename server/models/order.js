import mongoose from "mongoose";

const ORDER_SCHEMA = new mongoose.Schema({
	placedAt: { type: Date, default: Date.now() },
	total: {
        amount: { type: Number, required: true },
        currency: {
            type: String,
            default: "INR",
            set: (v) => v.toUpperCase()
        }
    },
	userId: { type: mongoose.SchemaTypes.ObjectId, 
        required: true, 
        set: (id) => id instanceof mongoose.Types.ObjectId? id : 
        new mongoose.Types.ObjectId(`${id}`)
    },
	deliveryAddress: { type: String, required: true },
	products: [{
		productId: { 
            type: mongoose.SchemaTypes.ObjectId, 
            required: true,
            set: (id) => id instanceof mongoose.Types.ObjectId? id : 
            new mongoose.Types.ObjectId(`${id}`) 
        },
		qty: { type: Number, required: true }
    }],
	status: { type: String, enum: ["received", "kitchen", "dispatched"], default: "received" },
    // paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
});

export default mongoose.model("Order", ORDER_SCHEMA);