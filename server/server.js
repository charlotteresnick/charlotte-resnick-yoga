const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const { PORT } = require("./utils/env");

const isDev = process.env.NODE_ENV !== "production";

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride("_method"));
  app.use(express.static("public"));
  app.use(cookieParser());
  app.use(cors());

  app.use(express.static(path.resolve(__dirname, "../client/build")));

  const apiRouter = require("./routes/api-router");
  app.use("/api", apiRouter);

  app.use("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.listen(PORT || 3001, () => {
    console.log(`Charlotte Yoga listening on port ${PORT || 3001} 🚀`);
  });
}
