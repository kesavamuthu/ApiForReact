const mongoose = require("mongoose");
const { authenticate } = require("../authenticate");
const Users = mongoose.model("Users");
const bcrypt = require("bcrypt");

// general_models is used to have models which are general
module.exports = (app) => {
  console.log("in index ");
  app.post("/authenticate", async function (req, res) {
    try {
      let { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send({ msg: "Mandatory details missing" });
      }
      let tok = await authenticate(req.body);
      res.status(200).send({ tok });
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: "Username or password mismatched" });
    }
  });
  app.post("/register", register);
};

const register = function (req, res) {
  let { firstName, lastName, email, password, mobNo, ext } = req.body;
  console.log(firstName, lastName, email, password, mobNo, ext);
  if (!firstName || !email || !password || !mobNo) {
    res.status(400).send({ msg: "Mandatory details missing" });
    return;
  }
  bcrypt.hash(password, 10, function (err, result) {
    const user = new Users({
      firstName,
      lastName,
      email,
      password: result,
      mobNo,
      ext,
    });
    user.save((err) => {
      if (!err) {
        res.status(201).send({ msg: "created" });
      } else {
        if (err.code && err.code === 11000) {
          res.status(400).send({ msg: "duplicate email" });
          return;
        }
        res.status(500).send();
        console.log(err);
      }
    });
  });
};
