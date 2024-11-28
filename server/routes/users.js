import express from "express";
import multer from "multer";
import authenticate from "../middlewares/authenticate.js";
import logoutController from "../controllers/users/logoutController.js";
import createUserController from "../controllers/users/createUserController.js";
import getUsersController from "../controllers/users/getUsersController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.post(upload.single("image"), createUserController)
.get(getUsersController);

router.get("/logout", authenticate, logoutController);

export default router;