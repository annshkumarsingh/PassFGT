import express from "express";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { verifyToken as auth } from "../middleware/Auth.js";

dotenv.config();
const router = express.Router();

export default function passRoutes(db) {
  const collection = db.collection("passwords");

  // GET /api/passwords  (when mounted at /api/passwords)
  router.get("/", auth, async (req, res, next) => {
    try {
      const passwords = await collection
        .find({ userId: req.user.id })
        .toArray();
      res.json(passwords);
    } catch (err) {
      next(err);
    }
  });

  // POST /api/passwords
  router.post("/", auth, async (req, res, next) => {
    try {
      const { url, username, password } = req.body;
      await collection.insertOne({
        url,
        username,
        password,
        userId: req.user.id,
        createdAt: new Date(),
      });
      res.status(201).json({ msg: "Successfully Added!" });
    } catch (err) {
      next(err);
    }
  });

  // PUT /api/passwords/:id
  router.put("/:id", auth, async (req, res, next) => {
    try {
      const id = req.params.id;
      const { url, username, password } = req.body;

      await collection.updateOne(
        { _id: new ObjectId(id), userId: req.user.id },
        { $set: { url, username, password } }
      );

      res.status(200).json({ msg: "Successfully updated!" });
    } catch (err) {
      next(err);
    }
  });

  // DELETE /api/passwords/:id
  router.delete("/:id", auth, async (req, res, next) => {
    try {
      const id = req.params.id;
      await collection.deleteOne({
        _id: new ObjectId(id),
        userId: req.user.id,
      });
      res.status(200).json({ msg: "Successfully deleted!" });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
