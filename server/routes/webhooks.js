import express from "express";
import placeOrderController from "../controllers/orders/placeOrderController.js";

const router = express.Router();

router.route("/")
.post(express.raw({ type: 'application/json' }), placeOrderController);

export default router;