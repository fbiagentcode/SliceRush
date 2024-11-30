import express from "express";
import authenticate from "../middlewares/authenticate.js";
import placeOrderController from "../controllers/orders/placeOrderController.js";
import getOrderByIdController from "../controllers/orders/getOrderByIdController.js";

const router = express.Router();

router.route("/")
.post(authenticate, placeOrderController);

router.route("/:orderId")
.get(authenticate, getOrderByIdController);

export default router;