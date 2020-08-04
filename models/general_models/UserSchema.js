let mongoose = require("mongoose");
// const db = mongoose.connection;

const UsersSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobNo: {
      type: Number,
      required: true,
    },
    ext: String,
  },
  { timestamps: true }
);

mongoose.model("Users", UsersSchema);
