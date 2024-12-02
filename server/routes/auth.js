import express from "express";
import authenticate from "../middlewares/authenticate.js";
import loginController from "../controllers/auth/loginController.js";
import logoutController from "../controllers/auth/logoutController.js";
import forgotPasswordController from "../controllers/auth/forgotPasswordController.js";
// import resetPasswordController from "../controllers/auth/resetPasswordController.js";

const router = express.Router();

router.post("/login", loginController);

router.get("/logout", authenticate, logoutController);

router.get("/forgot-password/:email", forgotPasswordController);

// router.put("reset-password", resetPasswordController);

export default router;