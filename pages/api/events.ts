import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  console.log("events.ts > handler-------");

  const eventsURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/events`;
  console.log("url:", eventsURL);
  console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);


  try {
    const response = await axios.get(eventsURL);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error in events handler:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

export default handler;
