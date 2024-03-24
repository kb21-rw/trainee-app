import express from "express";
import dotenv from "dotenv";
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
import { errorHandler } from "./middlewares/errorHandler";
import CustomError from "./middlewares/customError";
import { URL_NOT_FOUND } from "./utils/errorCodes";

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

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
app.use("/users", userRoute);

app.use("/trainees", traineeRoute);
app.use("/coaches", coachRoute);
app.use("/forms", formRoute);
app.use("/questions", questionRoute);
app.use("/applicants", applicantRoute);

const sessionConfig = {
  secret: 'secret_key',
  cookie: {
    secure: false,
    maxAge: 60 * 60 * 1000,
    sameSite: 'lax', 
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECERET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);


app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {

  res.send("This is the callback route");
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
