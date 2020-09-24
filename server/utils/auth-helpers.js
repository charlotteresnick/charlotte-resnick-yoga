const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function comparePass(userPassword, databasePassword) {
  return bcrpyt.compareSync(userPassword, databasePassword);
}

function generateAccessToken({ email, isAdmin }) {
  return jwt.sign({ email, isAdmin }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: "1800s",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

async function addFullUserToReq(req, res, next) {
  let user;
  try {
    user = await User.query().findOne({ email: req.user.email });
  } catch (err) {
    console.log(err);
    if (err || !user) return res.sendStatus(403);
  }

  req.user = user;
  next();
}

module.exports = {
  comparePass,
  generateAccessToken,
  authenticateToken,
  addFullUserToReq,
};
