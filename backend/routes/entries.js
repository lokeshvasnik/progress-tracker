import express from "express";
import Entry from "../models/Entry.js";

const router = express.Router();

// Get all entries
// This route retrieves all entries for a specific user based on their UID

router.get('/:uid', async (req, res) => {
  try {
    const entries = await Entry.find({ uid: req.params.uid });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new entry
router.post('/', async (req, res) => {
  const newEntry = new Entry(req.body);
  try {
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;