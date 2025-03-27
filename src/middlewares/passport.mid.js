import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {userManager} from "../data/mongo/manager.mongo.js";
import {createHash, verifyHash} from "../helpers/hash.helper.js";

passport.use(
    "register"
)
