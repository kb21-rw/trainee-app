import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 5000;
const mongodb_url = process.env.MONGODB_URL || "";
const app = express();

mongoose.connect(mongodb_url);
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
  });
});
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
