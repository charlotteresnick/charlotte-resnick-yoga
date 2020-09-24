const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/auth-helpers");

const usersController = {};

usersController.create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body.user;
  const salt = await bcrypt.genSaltSync();
  const passwordHash = await bcrypt.hashSync(password, salt);

  try {
    await User.query().insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });
  } catch (err) {
    return res.status(409).json({
      message: "user already exists",
      data: {},
    });
  }

  const token = generateAccessToken({ email, isAdmin: false });
  res.cookie("token", token, { httpOnly: true });
  return res.status(201).json({
    message: "user created",
    data: {
      token,
    },
  });
};

module.exports = usersController;
