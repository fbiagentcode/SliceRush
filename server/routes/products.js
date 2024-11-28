import express from "express";
import multer from "multer";
import addProductController from "../controllers/products/addProductController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.post(upload.single("image"), addProductController);

export default router;