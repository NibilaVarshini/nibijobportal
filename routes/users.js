const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /users
router.get('/getUser', async (req, res) => {
  try {
    
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
