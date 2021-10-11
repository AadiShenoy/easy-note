const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint,json } = format; 

const logger = createLogger({
  level: 'info',
  format: combine(
    json(),
    timestamp({format:"DD-MM-YYYY, HH:mm:ss"}) ,
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: './logger/error.log', level: 'error' }),
    new transports.File({ filename: './logger/combined.log' }),
  ],
});

module.exports = logger