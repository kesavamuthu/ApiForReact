module.exports = (app) => {
  require("../../models/db.config");
  require("../../models/excel_models/ExcelSchema");
  const tbController = require("../../controllers/excel.controller");
  const productController = require("../../controllers/product.controller");
  app.post("/excel", tbController.upload);
  app.post("/form/data", productController.upload);
};
