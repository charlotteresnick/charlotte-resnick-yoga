const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/users-router");

const app = express();
require("dotenv").config();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Ok");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});
