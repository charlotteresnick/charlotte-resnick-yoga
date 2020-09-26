const express = require("express");
const apiRouter = express.Router();

const authRouter = require("./auth-router");
const usersRouter = require("./users-router");
const messagesRouter = require("./messages-router");
const classesRouter = require("./classes-router");

const {
  PUBLIC_PATHS,
  validateJwt,
  addJwtContentToReq,
} = require("../utils/auth-helpers");

apiRouter.use(addJwtContentToReq, validateJwt.unless(PUBLIC_PATHS));

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/messages", messagesRouter);
apiRouter.use("/classes", classesRouter);

module.exports = apiRouter;
