const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth-controller");
const {
  authenticateToken,
  addFullUserToReq,
} = require("../utils/auth-helpers");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.get("/me", authenticateToken, addFullUserToReq, authController.me);
authRouter.get("/logout", authController.logout);

module.exports = authRouter;
