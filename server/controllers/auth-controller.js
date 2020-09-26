const usersController = require("../controllers/users-controller");
const { comparePass, generateAccessToken } = require("../utils/auth-helpers");
const User = require("../models/User");

const authController = {};

authController.register = (req, res, next) => {
  usersController.create(req, res, next);
};

authController.login = async (req, res) => {
  if (!req.body.user) {
    return res.status(400).send("Bad Request");
  }

  const {
    user: { email: formEmail, password: formPassword },
  } = req.body;

  if (!(formEmail && formPassword)) {
    return res.status(400).send("Bad Request");
  }

  const user = await User.query().findOne({ email: formEmail });

  if (!user || !comparePass(formPassword, user.passwordHash)) {
    return res.status(401).json({
      data: {
        errors: [
          {
            title: "Invalid Login",
            description: "username or password was incorrect",
          },
        ],
      },
    });
  }
  const { id, email, isAdmin, firstName, lastName, fullName } = user.toJSON();
  const token = generateAccessToken({
    id,
    email,
    isAdmin,
  });
  res.cookie("token", token, { httpOnly: true });
  return res.status(200).json({
    message: "authenticated",
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

authController.me = async (req, res) => {
  if (req.user) {
    const {
      id,
      firstName,
      lastName,
      email,
      fullName,
      isAdmin,
    } = req.user.toJSON();

    return res.status(200).json({
      message: "ok",
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
  } else {
    return res.status(200).json({
      message: "retry login",
      data: {
        user: null,
      },
    });
  }
};

authController.logout = (req, res) => {
  // Nothing to actually do here since logout is client side.
  return res.clearCookie("token").json({
    message: "logged out",
    data: {
      user: null,
    },
  });
};

module.exports = authController;
