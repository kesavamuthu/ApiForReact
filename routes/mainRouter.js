var indexRouter = require("./g_form_routes/index");
var usersRouter = require("./g_form_routes/users");
let testApi = require("./g_form_routes/testApi");
require("../models/db.config");
module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/test", testApi);
  require("./index")(app);
  require("./excel_routes/excelRouter")(app);
};
