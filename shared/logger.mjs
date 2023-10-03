import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, prettyPrint, json } = format;
const env = process.env.NODE_ENV || "dev";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../config/config.json")[env];
//const config = require(__dirname + "/../config/config.json")[env];

export const logger = createLogger({
  level: config.logLevel,
  format: combine(timestamp(), json()),
  transports: [new transports.Console()],
});
