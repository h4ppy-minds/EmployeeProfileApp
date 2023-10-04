const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, json } = format;
const env = process.env.NODE_ENV || "dev";
const config = require(__dirname + "/../config/config.json")[env];

const logger = (module.exports = createLogger({
  level: config.logLevel,
  format: combine(timestamp(), json()),
  transports: [new transports.Console()],
}));

// const winston = require("winston");
// const { createLogger, format, transports } = winston;
// // import { createLogger, format, transports } from "winston";
// const { combine, timestamp, label, printf, prettyPrint, json } = format;
// const env = process.env.NODE_ENV || "dev";
// // import { createRequire } from "module";
// // const require = createRequire(import.meta.url);
// const config = require("../config/config.json")[env];
// //const config = require(__dirname + "/../config/config.json")[env];

// //export const logger = createLogger({
// module.exports.logger = createLogger({
//   level: config.logLevel,
//   format: combine(timestamp(), json()),
//   transports: [new transports.Console()],
// });
