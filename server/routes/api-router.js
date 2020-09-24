const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./auth-router");
const usersRouter = require("./users-router");

const { jwtAuth, respondAuthErr } = require("../utils/auth-helpers");

apiRouter.use(jwtAuth, respondAuthErr);

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
