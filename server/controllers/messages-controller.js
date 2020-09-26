const Message = require("../models/Message");

const messagesController = {};

messagesController.create = async (req, res) => {
  const { name: formName, email: formEmail, message: formMessage } = req.body;

  if (!formMessage) {
    return res.status(400).send("Bad Request");
  }
  if (!req.user && !(formName && formEmail)) {
    return res.status(400).send("Bad Request");
  }

  let message;
  try {
    if (req.user) {
      message = await Message.query().insert({
        userId: req.user.id,
        message: formMessage,
      });
    } else {
      message = await Message.query().insert({
        name: formName,
        email: formEmail,
        message: formMessage,
      });
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }

  return res.status(201).json({
    message: "message sent",
    data: {
      message,
    },
  });
};

messagesController.getAll = async (req, res) => {
  const messages = await Message.query()
    .allowGraph("user")
    .withGraphFetched("user");

  const formattedMessages = messages.map((message) => {
    if (message.user) {
      const { user, ...rest } = message;
      return { ...rest, name: user.name, email: user.email };
    } else {
      const { user, ...rest } = message;
      return { ...rest };
    }
  });
  res.json(formattedMessages);
};

module.exports = messagesController;
