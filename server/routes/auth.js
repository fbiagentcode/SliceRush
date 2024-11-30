import express from "express";
import authenticate from "../middlewares/authenticate.js";
import loginController from "../controllers/users/loginController.js";
import logoutController from "../controllers/users/logoutController.js";

const router = express.Router();

router.post("/login", loginController);

router.get("/logout", authenticate, logoutController);

export default router;