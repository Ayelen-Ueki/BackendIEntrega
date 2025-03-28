import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {userManager} from "../data/mongo/manager.mongo.js";
import {createHash, verifyHash} from "../helpers/hash.helper.js";

passport.use(
    "register", 
    new LocalStrategy(
        {passReqToCallback:true, usernameField: "email" },  //the default usernameField is "name"
        async (req, email, password, done) => {
            try {
                const data = req.body;
                if(!data.birthday){
                    const error = new Error ("Missing data");
                    error.statusCode = 400;
                    throw error;
                }
                const user = await userManager.readBy({email});
                if(user){
                    const error = new Error ("Email already registered.");
                    error.statusCode = 401;
                    throw error;
                }
                //Protect data by hashing password
                data.password = createHash(password);
                const response =  await userManager.createOne(data)
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
        {passReqToCallback:true, usernameField: "email" },  //the default usernameField is "name"
        async (req, email, password, done) => {
            try {
                const response = await userManager.readBy({email});
                if(!response){
                    const error = new Error ("Email already registered.");
                    error.statusCode = 401;
                    throw error;
                }
                //Protect data by hashing password
                done(null, response);
            } catch (error) {
                done(error);
            }
        }
    )
)

export default passport;