import { getProfileById } from "../controllers/mss.getcertificate.controller.mjs";

export default function (app, router) {
  app.route("/api/getCertificate/:employeeId").get(getProfileById);
}
