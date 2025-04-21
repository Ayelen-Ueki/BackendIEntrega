import CustomRouter from "../custom.router.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const register = async (req, res) => {
  const response = req.user;
  res.json201(response, "Registered");
};

const login = async (req, res) => {
  const response = req.user;
  const token = req.token;
  const opts = { maxAge: 60 * 60 * 24 * 7, httoOnly: true };
  res
    .cookie("token", token, opts)
    .json200({ response, token, opts }, "Logged in");
};

const online = async (req, res) => {
  if (!req.user.user_id) {
    res.json401();
  }
  res.json200({ user: req.user });
};

const signout = async (req, res) => {
  res.clearCookie("token").json200(null, "Signed out");
};

const badAuth = async (req, res) => {
  res.json401("Bad auth from redirect");
};

const google = async (req, res) => {
  const response = req.user;
  res.json200(response);
};

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.create("/online", ["USER", "ADMIN"], online);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.create("/bad/auth", ["PUBLIC"], badAuth);
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad/auth",
      })
    );
    this.read(
      "/google/cb",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad/auth",
      })
    );
  };
}

let authRouter = new AuthRouter();
authRouter = authRouter.getRouter();
export default authRouter;
