import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const dbname = "passfgt";
const port = process.env.PORT || 3000;

// Middleware -> To check API key
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.VITE_API_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
});

async function main() {
  await client.connect();
  console.log("Connected to client!");
  const db = client.db(dbname);
  const collection = db.collection("passwords");

  // GET request
  app.get("/api/passwords", async (req, res) => {
    try {
      const findResults = await collection.find({}).toArray();
      res.status(200).send(findResults);
    } catch (error) {
      res.status(404).send("Couldn't find the passwords.");
    }
  });

  // POST request
  app.post("/api/passwords", async (req, res) => {
    try {
      await collection.insertOne(req.body);
      res.status(200).send("Successfully Added!");
    } catch (error) {
      res.status(500).send("Error Adding password.");
    }
  });

  // PUT request
  app.put("/api/passwords/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { url, username, password } = req.body;

      await collection.updateOne(
        { id: id },
        { $set: { url, username, password } }
      );

      res.status(200).send("Successfully updated!");
    } catch (error) {
      res.status(500).send("Error updating password.");
    }
  });

  // DELETE request
  app.delete("/api/passwords/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await collection.deleteOne({ id: id });
      res.status(200).send("Successfully deleted!");
    } catch (error) {
      res.status(500).send("Error Deleting password.");
    }
  });

  app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`);
  });
}

main().catch(console.error);