// backend/src/routes/attendees.ts

import express from 'express';
import client from '../db/db'; // Make sure this is the correct path to your db client

const router = express.Router();

router.post('/add', async (req, res) => {
  const { name, email, venmo, phone } = req.body;

  try {
    const query = 'INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [1, name, email, venmo, phone]; // Hardcoded event_id = 1
    const result = await client.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Error inserting attendee', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
