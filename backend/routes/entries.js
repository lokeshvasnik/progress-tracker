import express from "express";
import Entry from "../models/Entry.js";

const router = express.Router();

// Get all entries
// This route retrieves all entries for a specific user based on their UID

// Get all entries for a specific UID, optionally filtered by month & year
router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const { month, year } = req.query;

    const query = { uid };

    if (month && year) {
      const monthInt = parseInt(month, 10);
      const yearInt = parseInt(year, 10);

      if (isNaN(monthInt) || isNaN(yearInt) || monthInt < 1 || monthInt > 12) {
        return res.status(400).json({ message: "Invalid month or year." });
      }

      // Create proper date range
      const startDate = new Date(yearInt, monthInt - 1, 1); // e.g., 2025-06-01
      const endDate = new Date(yearInt, monthInt, 1);       // e.g., 2025-07-01

      query.date = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const entries = await Entry.find(query).sort({ date: 1 });

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