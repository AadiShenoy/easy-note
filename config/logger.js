/* ************************************************************************
 * Execution        : 1. default node  cmd> nodemon server.js              
 * @descrition      : creates custom logger for logging errors and infos
 * @file            : logger.js
 * @author          : Adithya S Shenoy
 * @version         : 1.0
 * @since           : 7-Oct-2021
 * 
 **************************************************************************/

const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, prettyPrint, json } = format;

var transport = new transports.DailyRotateFile({
  filename: "./logger/Log-%DATE%.log",
  datePattern: "DD-MM-YYYY",
});

/**
 * @description
 * creates a logger
 */
const logger = createLogger({
  level: "info",
  format: combine(
    json(),
    timestamp({ format: "DD-MM-YYYY, HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [transport],
});

module.exports = logger
