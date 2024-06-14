// This file will contain the API endpoint to fetch the events from your PostgreSQL database.
// frontend/pages/api/events.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../lib/db';


type Data = {
  events: { date: string; start_time: string; end_time: string }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("events.ts > async handler:");

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/events`);
    const data = await response.json();
    res.status(200).json({ events: data.events });
  } catch (error) {
    res.status(500).json({ events: [] });
  }
}

