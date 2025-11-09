import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/Auth.js";
import passRoutes from "./routes/Passwords.js";

dotenv.config();
const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://passfgt.vercel.app",
  "http://localhost:5173",
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


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

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Something went wrong on the server" });
});

main().catch(console.error);