// This file will contain the API endpoint to fetch the events from your PostgreSQL database.
// frontend/pages/api/events.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  events: { date: string; start_time: string; end_time: string }[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("events.ts > async handler:");
  try {
    console.log('Fetching from backend:', process.env.BACKEND_API_URL);
    const response = await fetch(`${process.env.BACKEND_API_URL}/events`);
    console.log('Response from backend:', response);
    if (!response.ok) {
      throw new Error(`Failed to fetch from backend: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    res.status(200).json({ events: data });
  } catch (error) {
    console.error('Error in events handler:', error);
    res.status(500).json({ events: [] });
  }
}
