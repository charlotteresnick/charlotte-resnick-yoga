const Class = require("../models/Class");

const classesController = {};

classesController.create = async (req, res) => {
  const {
    name: formName,
    description: formDescription,
    timeStart: formTimeStart,
    timeEnd: formTimeEnd,
    price: formPrice,
    location: formLocation,
    maxStudents: formMaxStudents,
  } = req.body;

  let clazz;
  try {
    clazz = await Class.query().insert({
      name: formName,
      description: formDescription,
      timeStart: formTimeStart,
      timeEnd: formTimeEnd,
      price: formPrice,
      location: formLocation,
      maxStudents: formMaxStudents,
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }

  return res.status(201).json({
    message: "class created",
    data: {
      clazz,
    },
  });
};

classesController.getAll = async (req, res) => {
  const classes = await Class.query();

  res.json(classes);
};

module.exports = classesController;
