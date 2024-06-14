import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
  console.log("BACKEND_API_URL:", process.env.BACKEND_API_URL);

  try {
    console.log("Fetching from backend:", `${process.env.BACKEND_API_URL}/events`);
    const response = await axios.get(`${process.env.BACKEND_API_URL}/events`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in events handler:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export default handler;
