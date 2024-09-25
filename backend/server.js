const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passop";

const port = 3000;
app.use(bodyParser.json());
app.use(cors());

client.connect();
const db = client.db(dbName);

//get all the pass
app.get("/", async (req, res) => {
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save a pass
app.post("/", async (req, res) => {
  const password = req.body;
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult });
});

//delete a pass
app.delete("/", async (req, res) => {
  const password = req.body;
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${3000}`);
});
