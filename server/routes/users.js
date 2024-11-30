import express from "express";
import multer from "multer";
import authenticate from "../middlewares/authenticate.js";
import createUserController from "../controllers/users/createUserController.js";
import getUsersController from "../controllers/users/getUsersController.js";
import getUserByIdController from "../controllers/users/getUserByIdController.js";
import updateUserByIdController from "../controllers/users/updateUserByIdController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.post(upload.single("image"), createUserController)
.get(getUsersController);

router.route("/:userId")
.get(authenticate, getUserByIdController)
.put(authenticate, updateUserByIdController);

export default router;