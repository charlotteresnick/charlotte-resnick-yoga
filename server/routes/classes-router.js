const classesController = require("../controllers/classes-controller");

const classesRouter = require("express").Router();

classesRouter.get("/", classesController.getAll);

classesRouter.post("/", classesController.create);

// TODO IMplement this
classesRouter.put("/:classId", (req, res) => {});

module.exports = classesRouter;
