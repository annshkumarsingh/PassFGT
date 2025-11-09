import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import passRoutes from "./routes/Passwords.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const dbname = "passfgt";
const port = process.env.PORT || 3000;

async function main() {
  await client.connect();
  console.log("Connected to MongoDB");
  const db = client.db(dbname);
  const collection = db.collection("passwords");

  // Auth routes
  app.use("/api/auth", authRoutes(db));

  // Password routes
  app.use("/api/passwords", passRoutes(db));

  app.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

main().catch(console.error);