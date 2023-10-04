// import { getProfileById } from "../controllers/mss.getcertificate.controller.js";

// export default function (app, router) {
//   app.route("/api/getCertificate/:employeeId").get(getProfileById);
// }
// index.js

const {
  getProfileById,
} = require("../controllers/mss.getcertificate.controller.js");

function setupRoutes(app, router) {
  app.route("/api/getCertificate/:employeeId").get(getProfileById);
}

module.exports = setupRoutes;
