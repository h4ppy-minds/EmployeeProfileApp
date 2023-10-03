import { getProfile } from "../services/mss.getcertificate.service.mjs";
import { logger } from "../shared/logger.mjs";

export const getProfileById = async (req, res, next) => {
  logger.info("Entered into get Employee Certificate controller method.");
  await getProfile(req, res);
};
