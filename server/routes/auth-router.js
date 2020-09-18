const express = require("express");
const authRouter = express.Router();
const usersController = require("../controllers/users-controller");
const passport = require("../services/local");
const User = require("../models/User");
authRouter.post("/register", usersController.create);

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        data: {
          errors: [
            {
              title: "Invalid Login",
              description: "username or password was incorrect",
            },
          ],
        },
      });
    }
    req.logIn(user, async (err) => {
      console.log(user, "user here");
      let userToFind = await User.findByUsername(user.username);
      let services = await userToFind.getServices();

      if (err) {
        return next(err);
      }
      return res.status(200).json({
        data: {
          user: {
            username: user.username,
            password_digest: user.password_digest,
            email: user.email,
            services: services,
            id: user.id,
          },
        },
      });
    });
  })(req, res, next);
});

authRouter.get("/me", async (req, res) => {
  if (req.user)
    return res.status(200).json({
      message: "ok",
      data: {
        user: {
          username: req.user.username,
          id: req.user.id,
          email: req.user.email,
          password_digest: req.user.password_digest,
          services: await req.user.getServices(),
        },
      },
    });
  else
    return res.status(200).json({
      message: "Retry Login",
      data: {
        user: null,
      },
    });
});

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.json({
    message: "logged out",
    auth: false,
    data: {
      user: null,
    },
  });
});

module.exports = authRouter;
