import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userManager } from "../data/mongo/manager.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

const {
  SECRET,
  GOOGLE_ID: clientID,
  GOOGLE_SECRET: clientSecret,
} = process.env;
const callbackURL = "http://localhost:8080/api/auth/google/cb";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" }, //the default usernameField is "name"
    async (req, email, password, done) => {
      try {
        const data = req.body;
        const user = await userManager.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "Invalid Credentials",
            statusCode: 401,
          });
        }
        //Protect data by hashing password
        data.password = createHash(password);
        const response = await userManager.createOne(data);
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" }, //the default usernameField is "name"
    async (req, email, password, done) => {
      try {
        const response = await userManager.readBy({ email });
        if (!response) {
          return done(null, null, {
            message: "Invalid Credentials",
            statusCode: 401,
          });
        }
        const verifyPassword = verifyHash(password, response.password);
        if (!verifyPassword) {
          return done(null, null, {
            message: "Invalid Credentials",
            statusCode: 401,
          });
        }
        const data = {
          user_id: response._id,
          email: response.email,
          role: response.role,
        };
        const token = createToken(data);
        req.token = token;
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Google authentication
passport.use(
  "google",
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.id;
        let user = await userManager.readBy({ email });
        if (!user) {
          user = {
            name: profile.name.givenName,
            avatar: profile.picture,
            email: profile.id,
            passport: createHash(profile.id),
          };
          user = await user.createOne(user);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//Verify if the user is already registered in the app with Jwt
passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await userManager.readBy(user_id);
        if (!user) {
          return done(null, null, { message: "Bad auth", statusCode: 401 });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

//Verify wether the user is an ADMIN or not
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await userManager.readBy(user_id);
        if (!user) {
          return done(null, null, { message: "Bad auth", statusCoed: 401 });
        }
        if (user.role !== "ADMIN") {
          return done(null, null, {
            message: "Forbidden",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
