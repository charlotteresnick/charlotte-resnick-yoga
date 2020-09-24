const usersController = require("../controllers/users-controller");
const { comparePass, generateAccessToken } = require("../utils/auth-helpers");
const User = require("../models/User");

const authController = {};

authController.register = (req, res, next) => {
  usersController.create(req, res, next);
};

authController.login = async (req, res) => {
  const {
    user: { email: formEmail, password: formPassword },
  } = req.body;

  const user = await User.query().findOne({ email: formEmail });

  console.log();
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
  const { email, isAdmin, firstName, lastName } = user;
  const token = generateAccessToken({
    email,
    isAdmin,
  });
  res.cookie("token", token, { httpOnly: true });
  return res.status(200).json({
    message: "authenticated",
    data: {
      user: {
        email,
        firstName,
        lastName,
        isAdmin,
      },
    },
  });
};

authController.me = async (req, res) => {
  if (req.user) {
    const { firstName, lastName, email, fullName, isAdmin } = req.user.toJSON();
    return res.status(200).json({
      message: "ok",
      data: {
        user: {
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
