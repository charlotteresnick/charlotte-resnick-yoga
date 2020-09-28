const classesController = require("../controllers/classes-controller");

const classesRouter = require("express").Router();

classesRouter.get("/", classesController.getAll);

classesRouter.post("/", classesController.create);

classesRouter.patch("/:id", classesController.edit);

module.exports = classesRouter;
