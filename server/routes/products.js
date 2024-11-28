import express from "express";
import multer from "multer";
import addProductController from "../controllers/products/addProductController.js";
import { viewIngredientsController, viewPizzaVarietiesController } from "../controllers/products/viewProductsController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.post(upload.single("image"), addProductController)

router.route("/ingredients")
.get(viewIngredientsController);

router.route("/pizzaVarieties")
.get(viewPizzaVarietiesController);

export default router;