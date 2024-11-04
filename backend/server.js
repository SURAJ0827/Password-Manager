const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

// Connection URL from .env file
const url = process.env.MONGO_URI; // Use your connection string from .env

const client = new MongoClient(url, {
  ssl: true, // Enable SSL
});

// Database Name
const dbName = "passop";

const port = 3000;
app.use(bodyParser.json());
app.use(cors());

client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas");
    const db = client.db(dbName);

    // Get all the passwords
    app.get("/", async (req, res) => {
      const collection = db.collection("passwords");
      const findResult = await collection.find({}).toArray();
      res.json(findResult);
    });

    // Save a password
    app.post("/", async (req, res) => {
      const password = req.body;
      const collection = db.collection("passwords");
      const findResult = await collection.insertOne(password);
      res.send({ success: true, result: findResult });
    });

    // Delete a password
    app.delete("/", async (req, res) => {
      const password = req.body;
      const collection = db.collection("passwords");
      const findResult = await collection.deleteOne(password);
      res.send({ success: true, result: findResult });
    });

    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas:", err);
  });
