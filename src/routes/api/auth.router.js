import express from "express";
import passport from "passport";
import isUser from "../../middlewares/isUser.mid.js";

const authRouter = express.Router();

const register = (req, res, next) => {
  try {
    res.status(201).json({
      response: req.user._id,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

const login = (req, res, next) => {
  try {
    res.status(200).json({
      response: req.token,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
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
