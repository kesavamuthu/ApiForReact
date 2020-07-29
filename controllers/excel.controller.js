let mongoose = require("mongoose");
// let router = require("express").Router();
let TableTitles = mongoose.model("ExcelSchema");

mongoose.set("debug", true);
exports.upload = async function (req, res, next) {
  try {
    let { fileName, title, userName, message } = req.body;
    userName = userName || "anonymous";
    if (!fileName || !title) {
      res.status(400).send({
        message: "File name and titles are mandatory",
      });
      return;
    }
    if (!message) {
      let tmp = fileName.match(/[a-zA-Z ]+/)[0];
      TableTitles.find(
        { fileName: new RegExp("^" + tmp), userName },
        (error, result) => {
          if (error) throw error;
          if (result.length) {
            let existsFileName = result.pop().fileName;
            console.log(existsFileName);
            let number = existsFileName.match(/\d+/) || 1;
            if (number) {
              number++;
              fileName = existsFileName.match(/[a-zA-Z ]+/)[0] + number;
            }
          }
          console.log(fileName);
          responseSupport(fileName, title, userName, res);
        }
      )
        .sort({ _id: -1 })
        .limit(1);
    } else {
      responseSupport(fileName, title, userName, res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

function responseSupport(fileName, title, userName, res) {
  let tableDetails = new TableTitles();
  fileName = fileName.includes(".")
    ? fileName.match(/(.*)\.[^.]+$/)[1]
    : fileName;
  tableDetails.fileName = fileName;
  tableDetails.title = title;
  tableDetails.userName = userName;
  tableDetails
    .save()
    .then((resultSet) => {
      res.status(200).send({
        fileName,
        message: "append",
      });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send({ message: "not saved " });
    });
}
