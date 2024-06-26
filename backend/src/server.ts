import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import cors from "cors";
import userRoute from "./routes/userRoute";
import applicantRoute from "./routes/applicantRoutes";
import traineeRoute from "./routes/traineeRoute";
import coachRoute from "./routes/coachRoute";
import formRoute from "./routes/formRoute";
import cohortRoutes from "./routes/cohortRoutes";
import questionRoute from "./routes/questionRoute";
import responseRoute from "./routes/responseRoute";
import overviewRoute from "./routes/overviewRoute";
import { errorHandler } from "./middlewares/errorHandler";
import CustomError from "./middlewares/customError";
import { URL_NOT_FOUND } from "./utils/errorCodes";

const PORT = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL || "";
const app = express();

mongoose.connect(mongodb_url);
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`The app is running on port ${PORT}`);
  });
});

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/trainees", traineeRoute);
app.use("/coaches", coachRoute);
app.use("/cohorts", cohortRoutes);
app.use("/forms", formRoute);
app.use("/questions", questionRoute);
app.use("/applicants", applicantRoute);
app.use("/responses", responseRoute);
app.use("/overview", overviewRoute);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    URL_NOT_FOUND,
    `Can't find ${req.originalUrl} on the server`,
    404
  );
  next(err);
});

app.use(errorHandler);
