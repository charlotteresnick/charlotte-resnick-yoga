const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", (req, res) => {
  User.query().then((users) => {
    res.json(users);
  });
});

module.exports = usersRouter;
