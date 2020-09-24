const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller");
const { populateFullUser } = require("../utils/auth-helpers");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", populateFullUser, authController.me);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
