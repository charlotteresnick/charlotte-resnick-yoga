require("dotenv").config();

const { PORT, JWT_SECRET_TOKEN } = process.env;

module.exports = {
  PORT,
  JWT_SECRET_TOKEN,
};
