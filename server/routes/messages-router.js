const messagesController = require("../controllers/messages-controller");
const { enforceAdmin } = require("../utils/auth-helpers");

const messagesRouter = require("express").Router();

messagesRouter.get("/", enforceAdmin, messagesController.getAll);

messagesRouter.post("/", (req, res) => {});

messagesRouter.delete("/", (req, res) => {});

messagesRouter.put("/", (req, res) => {});

module.exports = messagesRouter;
