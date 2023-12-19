require("express-async-errors");
const express = require("express");
const cors = require("cors");

const app = express();
const logger = require("./startup/logger");
app.use(cors());

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/prod")(app);



process.on("uncaughtException", (ex) => {
  logger.log("error", ex.message, ex);
  process.exit(1);
});
process.on("uncaughtException", (ex) => {
  throw ex;
});

app.listen(301, () => {
  console.log("listening on 301");
});

