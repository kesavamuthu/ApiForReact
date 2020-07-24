let mongoose = require("mongoose");
let path = require("path");
// require(path.join(__dirname))
// require("../db.config");
require("../../models/excel_models/ExcelSchema");
let es = mongoose.model("ExcelSchema");
let url =
  "mongodb+srv://demo:WE5Vydrar3Erys.@cluster0-tygzu.mongodb.net/node_with_mongo?retryWrites=true&w=majority";
mongoose.connect(url, { useUnifiedTopology: true });
console.log(path.join(__dirname));

es.find(
  {
    fileName: /^what/,
  },
  function (error, res) {
    if (error) {
      console.error(error);
      return;
    }
    console.log(res);
  }
)
  .sort({ _id: -1 })
  .limit(1);
