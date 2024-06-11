import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import client from './db/db';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Example route to get attendees from the database
app.get('/attendees', async (req, res) => {
  try {
    console.log('Attempting to query the database...');
    const result = await client.query('SELECT * FROM attendees');
    console.log('Query successful:', result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error querying the database', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
