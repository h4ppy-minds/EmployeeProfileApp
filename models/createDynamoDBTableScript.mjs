import { createRequire } from "module";
const require = createRequire(import.meta.url);
const {
  DynamoDBClient,
  CreateTableCommand,
  GetItemCommand,
  PutItemCommand,
} = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
import data from "./employeedataJson.json" assert { type: "json" };

const client = new DynamoDBClient({ region: "us-east-1" }); // replace with your DynamoDB region

const createTableParams = {
  TableName: "employee-store",
  KeySchema: [{ AttributeName: "employeeId", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "employeeId", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
};

const insertData = async () => {
  try {
    // Create DynamoDB table
    // await client.send(new CreateTableCommand(createTableParams));

    // console.log("Table created successfully.");

    // Insert data into DynamoDB table
    // replace with the path to your JSON file
    for (const item of data) {
      const params = {
        TableName: "employee-store",
        Item: marshall(item),
      };

      await client.send(new PutItemCommand(params));

      console.log(`Inserted item with employeeId ${item.employeeId}`);
    }

    console.log("Data inserted successfully.");
    // Get data based on employeeId
    // const employeeIdToFetch = 1; // replace with the employeeId you want to fetch
    // const getItemParams = {
    //   TableName: "employee-store",
    //   Key: marshall({ employeeId: employeeIdToFetch }),
    // };

    // const getItemCommand = new GetItemCommand(getItemParams);
    // const { Item } = await client.send(getItemCommand);

    // if (Item) {
    //   const employeeData = unmarshall(Item);
    //   console.log(
    //     `Fetched data for employeeId ${employeeIdToFetch}:`,
    //     employeeData
    //   );
    // } else {
    //   console.log(`No data found for employeeId ${employeeIdToFetch}`);
    // }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    // Close the DynamoDB client
    await client.destroy();
  }
};

insertData();
