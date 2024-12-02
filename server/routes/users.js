import express from "express";
import multer from "multer";
import authenticate from "../middlewares/authenticate.js";
import getUsersController from "../controllers/users/getUsersController.js";
import getUserByIdController from "../controllers/users/getUserByIdController.js";
import updateUserByIdController from "../controllers/users/updateUserByIdController.js";
import deleteUserByIdController from "../controllers/users/deleteUserByIdController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.get(getUsersController);

router.route("/:userId")
.get(authenticate, getUserByIdController)
.put(upload.single("image"), authenticate, updateUserByIdController)
.delete(authenticate, deleteUserByIdController);

export default router;