const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../key")
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Trip = mongoose.model("Trip")

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   //authorization === Bearer "string token"
//   if (!authorization) {
//     res.status(200).json({ msg: "you must be logged in", code: 400});
//   }
//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, JWT_SECRET, (err, payload) => {
//     if (err) {
//       return res.staus(200).json({msg: "you must be logged in", code: 400 });
//     }
//     const { _id } = payload;
//     User.findById(_id).then((userdata) => {
//       req.user = userdata;
//       next();
//     });
//     //continue to next middleware
//   });
// };

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer "string token"
  if (!authorization) {
    // res.status(200).json({ msg: "you must be logged in 1", code: 400});
    res.status(200)
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      // return res.staus(200).json({msg: "you must be logged in", code: 400 });
      return res.staus(200)
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
    //continue to next middleware
  });
};

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   //authorization === Bearer "string token"
//   if (!authorization) {
//     res.status(200).json({ msg: "you must be logged in 1", code: 400});
//   }
//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, JWT_SECRET, (err, payload) => {
//     if (err) {
//       return res.staus(200).json({msg: "you must be logged in", code: 400 });
//     }
//     const { _id } = payload;
//     Trip.findById(_id).then((tripdata) => {
//       req.trip = tripdata;
//       next();
//     });
//     //continue to next middleware
//   });
// };
