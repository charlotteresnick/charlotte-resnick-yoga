const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { PORT } = require("./utils/env");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Ok");
});

const apiRouter = require("./routes/api-router");
app.use("/api", apiRouter);

app.use("*", (_, res) => {
  res.status(404).json({
    message: "not found",
  });
});

app.listen(PORT || 3001, () => {
  console.log(`Charlotte Yoga listening on port ${PORT || 3001} 🚀`);
});
