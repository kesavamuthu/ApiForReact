const { secret } = require("./config/jwt.config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./models/general_models/UserSchema");

const authenticate = async ({ email, password }) => {
  try {
    const user = await Users.find({ email });
    let result = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, res) {
        if (!res) reject("Username or password incorrect");

        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: "7d" });
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
