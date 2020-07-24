module.exports = (app) => {
  require("../../models/excel_models/ExcelSchema");
  const tbController = require("../../controllers/excel.controller");
  app.post("/excel", tbController.upload);
};
