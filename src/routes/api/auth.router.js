import CustomRouter from "../custom.router.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const register = (req, res) => {
  const response = req.user;
  res.json201(response, "Registered");
};

const login = (req, res) => {
  const response = req.user;
  const token = req.token;
  const opts = { maxAge: 60 * 60 * 24 * 7, httoOnly: true };
  res.cookie("token", token, opts).json200(response, "Logged in");
};

const me = (req, res, next) => {
  try {
    res.status(200).json({
      response: { name: req.user.name, avatar: req.user.avatar },
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

authRouter.get(
  "/register",
  passport.authenticate("register", { session: false }),
  register
);

authRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  login
);

authRouter.get("/me", isUser, me);

export default authRouter;
