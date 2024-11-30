import express from "express";
import multer from "multer";
import authenticate from "../middlewares/authenticate.js";
import addProductController from "../controllers/products/addProductController.js";
import { viewIngredientsController, viewPizzaVarietiesController } from "../controllers/products/viewProductsController.js";
import { deleteIngredientsController, deletePizzaVarietiesController } from "../controllers/products/deleteProductsController.js";

const router = express.Router();
const upload = multer(multer.memoryStorage());

router.route("/")
.post(upload.single("image"), addProductController)

router.route("/ingredients")
.get(viewIngredientsController)
.delete(authenticate, deleteIngredientsController);

router.route("/pizzaVarieties")
.get(viewPizzaVarietiesController)
.delete(authenticate, deletePizzaVarietiesController);


export default router;