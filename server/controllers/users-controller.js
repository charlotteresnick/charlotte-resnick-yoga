// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const usersController = {};

// usersController.create = async (req, res, next) => {
//   try {
//     const salt = await bcrypt.genSaltSync();
//     const hash = await bcrypt.hashSync(req.body.user.password, salt);
//     let user = await new User({
//       username: req.body.user.username,
//       email: req.body.user.email,
//       password_digest: hash,
//     });
//     await user.save();
//     req.login(user, (err) => {
//       if (err) return next(err);
//       res.status(201).json({
//         message: "user created",
//         auth: true,
//         data: {
//           user,
//         },
//       });
//     });
//   } catch {
//     next();
//   }
// };

// module.exports = usersController;
