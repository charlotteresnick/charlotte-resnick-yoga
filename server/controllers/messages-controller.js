const User = require("../models/User");
const Message = require("../models/Message");

const messagesController = {};

messagesController.create = async (req, res) => {
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
      user: {
        firstName,
        lastName,
        email,
        isAdmin: false,
      },
    },
  });
};

// TODO
// - Add admin only
// - Add user information to those with userId
messagesController.getAll = async (req, res) => {
  Message.query().then((messages) => {
    res.json(messages);
  });
};

module.exports = messagesController;
