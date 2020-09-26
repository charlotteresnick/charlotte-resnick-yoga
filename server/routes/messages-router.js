const messagesController = require("../controllers/messages-controller");
const { enforceAdmin } = require("../utils/auth-helpers");

const messagesRouter = require("express").Router();

messagesRouter.get("/", enforceAdmin, messagesController.getAll);

messagesRouter.post("/", messagesController.create);

// TODO IMplement this
messagesRouter.put("/:messageId", (req, res) => {});

module.exports = messagesRouter;
