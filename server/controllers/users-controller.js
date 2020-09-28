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

usersController.edit = async (req, res) => {
  const {
    firstName: formFirstName,
    lastName: formLastName,
    email: formEmail,
    password: formPassword,
    isAdmin: formIsAdmin,
  } = req.body.user;

  console.log(req.body.user);
  const userId = req.params.id;
  console.log(userId);

  let user = await User.query().findById(userId);
  if (!user) {
    return res.status(400).send("Bad Request");
  }

  const newFields = {};

  if (formFirstName) {
    newFields.firstName = formFirstName;
  }
  if (formLastName) {
    newFields.lastName = formLastName;
  }
  if (formEmail && formEmail !== user.email) {
    const conflict = await User.query().where({ email: formEmail });
    if (conflict) {
      return res.status(400).send("Bad Request");
    }
    newFields.email = formEmail;
  }
  if (formPassword) {
    const salt = await bcrypt.genSaltSync();
    const passwordHash = await bcrypt.hashSync(formPassword, salt);
    newFields.passwordHash = passwordHash;
  }
  if (formIsAdmin) {
    newFields.isAdmin = formIsAdmin === "true";
  }

  await User.query().findById(userId).patch(newFields);
  user = await User.query().findById(userId);

  const { passwordHash, ...rest } = user.toJSON();

  return res.status(200).json({
    message: "user edited",
    data: {
      user: rest,
    },
  });
};

module.exports = usersController;
