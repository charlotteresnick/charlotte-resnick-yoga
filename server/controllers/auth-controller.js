const usersController = require("../controllers/users-controller");
const { comparePass, generateAccessToken } = require("../utils/auth-helpers");
const User = require("../models/User");

const authController = {};

authController.register = (req, res, next) => {
  usersController.create(req, res, next);
};

authController.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.query().findOne({ email });

  console.log();
  if (!user || !comparePass(password, user.passwordHash)) {
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

  return res.status(200).json({
    message: "authenticated",
    data: {
      token: generateAccessToken({ email: user.email, isAdmin: user.isAdmin }),
    },
  });
};

authController.me = async (req, res) => {
  if (req.user) {
    const { firstName, lastName, email, fullName } = req.user.toJSON();
    return res.status(200).json({
      message: "ok",
      data: {
        user: {
          firstName,
          lastName,
          email,
          fullName,
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
  res.json({
    message: "logged out",
    auth: false,
    data: {
      user: null,
    },
  });
};

module.exports = authController;
