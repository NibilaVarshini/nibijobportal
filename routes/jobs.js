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
  const { title, position, location,jobreferenceid,companyname,description,salary} = req.body;
  try {
    const result = await db.query(
      'INSERT INTO jobs (title, position, location,jobreferenceid,companyname,description,salary) VALUES ($1, $2, $3,$4,$5,$6,$7) RETURNING *',
      [title, position, location,jobreferenceid,companyname,description,salary]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE /jobs/:jobopeningid
router.delete('/deleteJob/:jobreferenceid', async (req, res) => {
  const { jobreferenceid } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM jobs WHERE jobreferenceid = $1 RETURNING *',
      [jobreferenceid]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully', job: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
