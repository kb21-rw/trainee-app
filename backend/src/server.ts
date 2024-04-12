import express from "express";

import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import cors from "cors";
import passport from "passport";
import session from "cookie-session";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import applicantRoute from "./routes/applicantRoutes"
import traineeRoute from "./routes/traineeRoute";
import coachRoute from "./routes/coachRoute";
import formRoute from "./routes/formRoute";
import questionRoute from "./routes/questionRoute";
import responseRoute from "./routes/responseRoute";
import { errorHandler } from "./middlewares/errorHandler";
import CustomError from "./middlewares/customError";
import { URL_NOT_FOUND } from "./utils/errorCodes";
import setupPassport from "./passport-setup"


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
app.use("/users", userRoute);
app.use("/trainees", traineeRoute);
app.use("/coaches", coachRoute);
app.use("/forms", formRoute);
app.use("/questions", questionRoute);
app.use("/applicants", applicantRoute);
app.use("/responses", responseRoute);

const sessionConfig = {
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
setupPassport();

app.get('/login', (req, res) => {
  res.send("<a href='/auth/google'>continue with google</a>");
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/callback',  passport.authenticate('google', { successRedirect:'/welcome', failureRedirect: '/login' }
)
);
app.get('/welcome', passport.authenticate('google', { failureRedirect: '/login' }
),(req, res) => {
  res.send("This is the welcome page");
});


app.all("*", (req, res, next) => {
  const err = new CustomError(
    URL_NOT_FOUND,
    `Can't find ${req.originalUrl} on the server`,
    404,
  );
  next(err);
});

app.use(errorHandler);
