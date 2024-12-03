import express from "express";
import authenticate from "../middlewares/authenticate.js";
import signUpController from "../controllers/auth/signUpController.js";
import verificationController from "../controllers/auth/verificationController.js";
import resendConfirmationController from "../controllers/auth/retryConfirmationController.js";
import loginController from "../controllers/auth/loginController.js";
import logoutController from "../controllers/auth/logoutController.js";
import forgotPasswordController from "../controllers/auth/forgotPasswordController.js";
import resetPasswordController from "../controllers/auth/resetPasswordController.js";

const router = express.Router();

router.post("/sign-up", signUpController);

router.post("/confirmation", verificationController);

router.post("/resend-confirmation-mail", resendConfirmationController);

router.post("/login", loginController);

router.get("/logout", authenticate, logoutController);

router.post("/forgot-password", forgotPasswordController);

router.put("/reset-password", resetPasswordController);

export default router;