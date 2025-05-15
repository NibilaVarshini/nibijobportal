const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /users
router.get('/getJobs', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM jobs');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users
router.post('/addJob', async (req, res) => {
  const { title, position, location,jobreferenceid } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO jobs (title, position, location,jobreferenceid) VALUES ($1, $2, $3,$4) RETURNING *',
      [title, position, location,jobreferenceid]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
