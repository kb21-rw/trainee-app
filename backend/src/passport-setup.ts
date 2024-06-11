import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { generateUserId } from "./services/applicantService";
import User from "./models/User";
import { Role } from "./utils/types";

export default function setupPassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        scope: ["profile", "email"],
      },
      async function (accessToken, refreshToken, profile, done) {
        if (!profile.emails) {
          return done(new Error("Email not provided in profile"));
        }

        let user = await User.findOne({
          $or: [{ googleId: profile.id }, { email: profile._json.email }],
        });
        if (!user) {
          const userId = await generateUserId();
          user = new User({
            userId,
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            role: Role.APPLICANT,
          });
          await user.save();
        }

        return done(null, user);
      }
    )
  );
}
