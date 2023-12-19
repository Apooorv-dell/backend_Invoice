require("express-async-errors");

const { createLogger, format, transports, handleException } = require("winston");

require("winston-mongodb");

const { combine, errors, json, metadata, timestamp, colorize } = format;

module.exports = createLogger({

  format: combine(errors({ stack: true }), json(), metadata(), timestamp()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logfile.log",
      format: combine(
        colorize({
          all: false,
        })
      ), 
    }),
    new transports.File({
      filename: "uncaughtException.log",
      format: combine(
        colorize({
          all: false,
        })
      ), 
    }),
    new transports.MongoDB({
      db: "mongodb://localhost/invoicer",
      level: "error",
      storeHost: true,
      capped: true,
    }),
  ],
});
