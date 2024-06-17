// frontend/components/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './AdminDashboard.module.scss';

interface Event {
  event_id: number;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface Attendee {
  id: number;
  event_id: number;
  name: string;
  email: string;
  venmo_handle: string;
  phone_number: string;
  neighborhood: string;
  photo_url: string;
  drink_details: string;
  alcohol_details: string;
  bring_anything: string;
}

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/events`);
        console.log("Admin dashboard with event response:", response);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchAttendees = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/attendees`);
        setAttendees(response.data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchEvents();
    fetchAttendees();
  }, []);

  const deleteAttendee = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/attendees/${id}`);
      setAttendees(attendees.filter(attendee => attendee.id !== id));
    } catch (error) {
      console.error('Error deleting attendee:', error);
    }
  };


  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.title}>Admin Dashboard</h1>

      <div className={styles.tableContainer}>
        <h2>Events</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.type}</td>
                <td>{event.date}</td>
                <td>{event.start_time}</td>
                <td>{event.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.tableContainer}>
        <h2>Attendees</h2>
        <table>
          <thead>
            <tr>
              <th className={styles.narrowColumn}>Delete</th>
              <th>id</th>
              <th>event_id</th>
              <th> name</th>
              <th>email</th>
              <th>venmo</th>
              <th>phone</th>
              <th>neighborhood</th>

              <th>photo_url </th>
              <th>drink_alcohol </th>
              <th>alcohol_details </th>
              <th>bring_anything </th>
            </tr>
          </thead>
          <tbody>
            {attendees.map(attendee => (
              <tr key={attendee.id}>
                <td className={styles.narrowColumn}>
                  <button onClick={() => deleteAttendee(attendee.id)} className={styles.deleteButton}>X</button>
                </td>
                <td>{attendee.id}</td>
                <td>{attendee.event_id}</td>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.venmo_handle}</td>
                <td>{attendee.phone_number}</td>
                <td>{attendee.neighborhood}</td>
                <td>{attendee.photo_url}</td>
                <td>{attendee.drink_details}</td>
                <td>{attendee.alcohol_details}</td>
                <td>{attendee.bring_anything}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
