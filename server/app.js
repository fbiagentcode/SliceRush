import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import products from "./routes/products.js";
import mongooseErrorHandler from "./middlewares/mongooseErrorHandler.js";

mongoose.connect(process.env.CONNECTION_STRING, {dbName: 'slice-rush'})
.then(() => {
    console.log("Connected to database.");
    app.listen(PORT, () => console.log(`Delivering pizzas on PORT ${PORT}`));
})
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/products", products);

app.use(mongooseErrorHandler);

app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) res.status(err.code || err.statusCode || 500).json({errors: err.err || err});
});

