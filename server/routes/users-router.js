const usersRouter = require("express").Router();
const usersController = require("../controllers/users-controller");
const User = require("../models/User");

usersRouter.get("/", (req, res) => {
  User.query().then((users) => {
    res.json(users);
  });
});

usersRouter.patch("/:id", usersController.edit);

module.exports = usersRouter;
