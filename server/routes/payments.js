import express from "express";
import authenticate from "../middlewares/authenticate.js";
import checkoutSessionController from "../controllers/payments/checkoutSessionController.js";

const router = express.Router();

router.post("/checkout-session", authenticate, checkoutSessionController);

export default router;