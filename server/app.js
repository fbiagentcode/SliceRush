import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => console.log("Connected to database."))
.catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
    console.log(err);
    if (!res.headersSent) res.status(err.code || 500).json({errors: err});
});