const getcertificateService = require("../services/mss.getcertificate.service.js");
const logger = require("../shared/logger.js");

const getProfileById = async (req, res, next) => {
  logger.info("Entered into get Employee Certificate controller method.");
  await getcertificateService.getProfile(req, res);
};

module.exports = { getProfileById };

// import { getProfile } from "../services/mss.getcertificate.service.js";
// import { logger } from "../shared/logger.js";

// export const getProfileById = async (req, res, next) => {
//   logger.info("Entered into get Employee Certificate controller method.");
//   await getProfile(req, res);
// };
