import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serverless = require("serverless-http");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
// This will be our application entry. We'll setup our server here.
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
// Set up the express app
const app = express();

const router = express.Router();
// Log requests to the console.
app.use(logger("dev"));
// For multi form data
//app.use(upload.array());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json({ limit: "10mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
//app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.options("*", cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Expose-Headers", "CookieValue");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});
import profileRoute from "./routes/mss.getcertificate.route.mjs";
profileRoute(app, router);
//require("./routes/mss.getcertificate.route.mjs")(app, router);

app.use(function (err, req, res, next) {
  console.log("send");
  if (err.isBoom) {
    var error = {
      Status: 400,
      Info: [
        {
          Error: err.data[0].message.replace(/\"/g, ""),
        },
      ],
      message: "Check Request Data",
    };
    console.log("JOI validation error");
    console.log("Payload Request : " + JSON.stringify(req.body));
    console.log(error);
    res.send(error);
  }
});

// const port = parseInt(process.env.PORT, 10) || 3000;
// app.set("port", port);
// const server = http.createServer(app);
// server.listen(port);
// export default app;
module.exports.handler = serverless(app);
