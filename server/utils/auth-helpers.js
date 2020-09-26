const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { JWT_SECRET_TOKEN } = require("../utils/env");
const PUBLIC_PATHS = {
  path: [
    "/api/auth/login",
    "/api/auth/register",
    { url: "/api/messages", methods: ["POST"] },
  ],
};

const comparePass = (userPassword, databasePassword) => {
  return bcrpyt.compareSync(userPassword, databasePassword);
};

const generateAccessToken = ({ id, email, isAdmin }) => {
  return jwt.sign({ id, email, isAdmin }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1800s",
  });
};

const addJwtContentToReq = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return next();
  }
  const secret = JWT_SECRET_TOKEN;
  const options = {
    algorithms: ["HS256"],
  };

  jwt.verify(token, secret, options, (err, decoded) => {
    if (err) {
      return next();
    } else {
      req.user = decoded;
      return next();
    }
  });
};

const validateJwt = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  const secret = JWT_SECRET_TOKEN;
  const options = {
    algorithms: ["HS256"],
  };

  jwt.verify(token, secret, options, (err) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    next();
  });
};
validateJwt.unless = require("express-unless"); // Adds support for unless

// const jwtAuth = express_jwt({
//   secret: JWT_SECRET_TOKEN,
//   getToken: (req) => req.cookies.token,
//   algorithms: ["HS256"],
//   credentialsRequired: false, // We want to fall through, and catch explicitly that a user exists on routes except for those that we decide are public.
// });

// const respondWithJWTAuthenticationError = (err, req, res) => {
//   if (err.name === "UnauthorizedError") {
//     return res.status(401).send("Unauthorized");
//   }
// };
// respondWithJWTAuthenticationError.unless = require("express-unless"); // Adds support for unless

const populateFullUser = async (req, res, next) => {
  User.query()
    .findOne({ email: req.user.email })
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch((err) => {
      console.log(err);
      if (err || !user) return res.sendStatus(403);
    });
};

const enforceAdmin = (req, res, next) => {
  if (!req?.user?.isAdmin) return res.sendStatus(403);
  return next();
};

module.exports = {
  comparePass,
  generateAccessToken,
  populateFullUser,
  enforceAdmin,
  PUBLIC_PATHS,
  addJwtContentToReq,
  validateJwt,
};
