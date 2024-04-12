import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Applicant from "./models/Applicant";
import { generateUserId } from "./services/applicantService";


export default function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECERET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        if (!profile.emails) {
          return done(new Error("Email not provided in profile"));
        }

        const email = profile.emails[0].value;

        let user = await Applicant.findOne({ googleId: profile.id });
    const userId = await generateUserId();
        if (!user) {
          user = new Applicant({
            userId: userId,
            googleId: profile.id,
            email: email,
          });
          await user.save();
        }

        return done(null, user);
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await Applicant.findById(id); 
      done(null, user); 
    } catch (err) {
      done(err, null);
    }
  })}