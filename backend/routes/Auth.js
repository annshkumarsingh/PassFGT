import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

export default function authRoutes(db) {
  const users = db.collection("users"); // "users" collection

  // Signup
  router.post("/signup", async (req, res) => {
    try {
      console.log("signup route hit!")
      const { username, password } = req.body;

      // Check if user already exists
      const existing = await users.findOne({ username });
      if (existing) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      // Insert new user
      await users.insertOne({ username, password: hashed });
      res.status(201).json({ msg: "User created" });
    } catch (err) {
      res.status(500).json({ error: "Error creating user" });
    }
  });

  // Login
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await users.findOne({ username });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare passwords
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Sign JWT
      // routes/Auth.js (login)
      const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Error logging in" });
    }
  });

  return router;
}
