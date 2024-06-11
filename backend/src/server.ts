import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import client from './db/db';
import attendeesRoute from './routes/attendees'; // Import the attendees route

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/events', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching events', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/attendees', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM attendees');
    res.status(200).json(result.rows);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching attendees', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/attendees', async (req, res) => {
  const { name, email, venmo, phone } = req.body;
  const eventId = 1; // Assuming event_id is 1 as you mentioned

  if (!name || !email || !venmo || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await client.query(
      'INSERT INTO attendees (event_id, name, email, venmo_handle, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [eventId, name, email, venmo, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const err = error as Error;
    console.error('Error inserting attendee', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/attendees', attendeesRoute); // Use the attendees route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
