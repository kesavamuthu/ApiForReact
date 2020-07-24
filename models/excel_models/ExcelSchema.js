let mongoose = require("mongoose");
const db = mongoose.connection;

const TitleSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    title: {
      type: Array,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("ExcelSchema", TitleSchema);
