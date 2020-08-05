const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { secret } = require("./config/jwt.config.json");
const Users = mongoose.model("Users");

const authenticate = async ({ email, password }) => {
  try {
    const user = await Users.find({ email });
    let result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user[0].password, function (err, res) {
        console.log(err, res, user[0]._id);
        if (!res) reject("Username or password incorrect");

        const token = jwt.sign({ sub: user[0]._id }, secret, {
          expiresIn: "7d",
        });
        resolve(token);
      });
    });
    if (result) return result;
  } catch (error) {
    throw TypeError(error);
  }
};

module.exports = {
  authenticate,
};
