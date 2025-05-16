const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/getCandidate', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM candidate');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/addCandidate', async (req, res) => {
    try {
        const { name, email, phone, jobreferenceid,educationDetails,experienceDetails } = req.body;
        // Insert candidate basic details
        const candidateResult = await db.query(
            'INSERT INTO candidate (name, email, phone, joboppeningid) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, email, phone, jobreferenceid]
        );
        const candidateId = candidateResult.rows[0].id; 

        // Insert education details (handles one or more items)
        if (Array.isArray(educationDetails) && educationDetails.length > 0) {
            for (const edu of educationDetails) {
            await db.query(
                'INSERT INTO educationsdetail (candidate_id, institutename, major, yearofpassing, degree) VALUES ($1, $2, $3, $4, $5)',
                [candidateId, edu.institutename, edu.major, edu.yearofpassing, edu.degree]
            );
            }
        }

        // Insert experience details (handles one or more items)
        if (Array.isArray(experienceDetails) && experienceDetails.length > 0) {
            for (const exp of experienceDetails) {
            await db.query(
                'INSERT INTO experiencedetail (candidate_id, companyname, posistion, yearofexperience, currentctc) VALUES ($1, $2, $3, $4, $5)',
                [candidateId, exp.companyname, exp.position, exp.yearsofexperience, exp.currentctc]
            );
            }
        }

        res.status(201).json({ message: 'Candidate added successfully', candidateId });
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
});

module.exports = router;