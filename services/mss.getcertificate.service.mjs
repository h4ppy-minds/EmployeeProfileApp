import { logger } from "../shared/logger.mjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const statusCode = require("../shared/statusCodes.json");
//const statusCode = require("../shared/statusCodes");
const moment = require("moment");
const {
  DynamoDBClient,
  CreateTableCommand,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "us-east-1" });
// import db from "../models/dynamoIndex.mjs";
// import { EmployeeData } from "../models/EmployeeData";

export const createProfile = async (req, res) => {
  try {
    logger.info("Entered into Employee create Profile Logic");
  } catch (err) {
    logger.error("error while Inserting employee certificate", err);
    res.status(parseInt(statusCode.INTERNAL_SERVER_ERROR)).send({
      statusCode: parseInt(statusCode.INTERNAL_SERVER_ERROR),
      Message: err.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    logger.info("Entered into Employee Fetch Profile Logic");
    console.log(req.params);
    const employeeIdToFetch = req.params.employeeId; // replace with the employeeId you want to fetch
    const getItemParams = {
      TableName: "employee",
      Key: marshall({ employeeId: parseInt(employeeIdToFetch) }),
    };

    const getItemCommand = new GetItemCommand(getItemParams);
    const { Item } = await client.send(getItemCommand);

    if (Item) {
      const employeeData = unmarshall(Item);
      console.log(
        `Fetched data for employeeId ${employeeIdToFetch}:`,
        employeeData
      );
      res.status(parseInt(statusCode.OK)).send({
        statusCode: parseInt(statusCode.OK),
        Message: "Successfully Fetched Profile Records",
        data: employeeData,
      });
    } else {
      console.log(`No data found for employeeId ${employeeIdToFetch}`);
      res.status(parseInt(statusCode.OK)).send({
        statusCode: parseInt(statusCode.OK),
        Message: "Successfully Fetched Profile Records",
        data: {},
      });
    }
  } catch (err) {
    logger.error("error while getting profile records", err);
    res.status(parseInt(statusCode.INTERNAL_SERVER_ERROR)).send({
      statusCode: parseInt(statusCode.INTERNAL_SERVER_ERROR),
      Message: err.message,
      errorStack: err.stack,
    });
  }
};
