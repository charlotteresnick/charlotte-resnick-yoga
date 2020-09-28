const moment = require("moment");
moment.suppressDeprecationWarnings = true;

const Class = require("../models/Class");

const classesController = {};

const weirdDateHack = (input) => {
  return moment(input.replace("T", " ")).toISOString();
};

classesController.create = async (req, res) => {
  const {
    name: formName,
    description: formDescription,
    timeStart: formTimeStart,
    timeEnd: formTimeEnd,
    price: formPrice,
    location: formLocation,
    maxStudents: formMaxStudents,
  } = req.body.clazz;
  let clazz;
  try {
    clazz = await Class.query().insert({
      name: formName,
      description: formDescription,
      timeStart: weirdDateHack(formTimeStart),
      timeEnd: weirdDateHack(formTimeEnd),
      price: formPrice,
      location: formLocation,
      maxStudents: formMaxStudents,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }

  return res.status(201).json({
    message: "class created",
    data: {
      clazz,
    },
  });
};

classesController.edit = async (req, res) => {
  const {
    name: formName,
    timeStart: formTimeStart,
    timeEnd: formTimeEnd,
    price: formPrice,
    location: formLocation,
    description: formDescription,
    maxStudents: formMaxStudents,
  } = req.body.clazz;

  const classId = req.params.id;

  let clazz = await Class.query().findById(classId);
  if (!clazz) {
    return res.status(400).send("Bad Request");
  }

  const newFields = {};

  if (formName) {
    newFields.name = formName;
  }
  if (formTimeStart) {
    newFields.timeStart = weirdDateHack(formTimeStart);
  }
  if (formTimeEnd) {
    newFields.timeStart = weirdDateHack(formTimeEnd);
  }
  if (formPrice) {
    newFields.price = formPrice;
  }
  if (formLocation) {
    newFields.location = formLocation;
  }
  if (formDescription) {
    newFields.description = formDescription;
  }
  if (formMaxStudents) {
    newFields.maxStudents = formMaxStudents;
  }

  await Class.query().findById(classId).patch(newFields);
  clazz = await Class.query().findById(classId);

  return res.status(200).json({
    message: "class edited",
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
