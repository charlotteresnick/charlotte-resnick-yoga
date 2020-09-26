const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAccessToken } = require("../utils/auth-helpers");

const usersController = {};

usersController.create = async (req, res) => {
  const {
    firstName: formFirstName,
    lastName: formLastName,
    email: formEmail,
    password: formPassword,
  } = req.body.user;
  const salt = await bcrypt.genSaltSync();
  const passwordHash = await bcrypt.hashSync(formPassword, salt);

  let user;
  try {
    user = await User.query().insert({
      firstName: formFirstName,
      lastName: formLastName,
      email: formEmail,
      passwordHash,
    });
  } catch (err) {
    return res.status(409).json({
      message: "user already exists",
      data: {},
    });
  }

  const { id, firstName, lastName, email, fullName, isAdmin } = user.toJSON();

  const token = generateAccessToken({ id, email, isAdmin: false });
  res.cookie("token", token, { httpOnly: true });
  return res.status(201).json({
    message: "user created",
    data: {
      user: {
        id,
        firstName,
        lastName,
        email,
        fullName,
        isAdmin,
      },
    },
  });
};

module.exports = usersController;
