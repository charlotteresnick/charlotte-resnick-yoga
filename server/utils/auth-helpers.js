const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express_jwt = require("express-jwt");

const User = require("../models/User");

const { JWT_SECRET_TOKEN } = require("../utils/env");
const PUBLIC_PATHS = ["/api/auth/login", "/api/auth/register"];

const comparePass = (userPassword, databasePassword) => {
  return bcrpyt.compareSync(userPassword, databasePassword);
};

const generateAccessToken = ({ email, isAdmin }) => {
  return jwt.sign({ email, isAdmin }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1800s",
  });
};

const jwtAuth = express_jwt({
  secret: JWT_SECRET_TOKEN,
  getToken: (req) => req.cookies.token,
  algorithms: ["HS256"],
}).unless({ path: PUBLIC_PATHS });

const respondAuthErr = (err, _, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized");
  }
};

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
  jwtAuth,
  respondAuthErr,
  populateFullUser,
  enforceAdmin,
};
