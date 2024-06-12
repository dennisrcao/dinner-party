import express from 'express';
import client from '../db/db'; // Make sure this is the correct path to your db client

const router = express.Router();

// Get all attendees
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM attendees');
    res.status(200).json(result.rows);
  } catch (err: any) {
    console.error('Error fetching attendees', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new attendee
router.post('/', async (req, res) => { // Changed '/add' to '/'
  console.log("add new Attendee:", req.body);
  const { name, email, venmo, phone, photoURL } = req.body;

  if (!name || !email || !venmo || !phone || !photoURL) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [1, name, email, venmo, phone, photoURL]; // Hardcoded event_id = 1
    const result = await client.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Error inserting attendee', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE attendee by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM attendees WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await client.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    res.status(200).json({ message: 'Attendee deleted', attendee: result.rows[0] });
  } catch (err: any) {
    console.error('Error deleting attendee', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
