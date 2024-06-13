import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import client from './db/db';
import attendeesRoute from './routes/attendees'; // Import the attendees route

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser for JSON
app.use(express.urlencoded({ extended: true })); // Replaces body-parser for URL-encoded data

// Events Route
app.get('/events', async (req, res) => {
  console.log("hitting the backend /events");
  try {
    const result = await client.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching events', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Attendees Routes
app.use('/attendees', attendeesRoute); // Use the attendees route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
