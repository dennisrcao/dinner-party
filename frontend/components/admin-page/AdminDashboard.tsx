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
}

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchAttendees = async () => {
      try {
        const response = await axios.get('http://localhost:5001/attendees');
        setAttendees(response.data);
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchEvents();
    fetchAttendees();
  }, []);

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
              <th>ID</th>
              <th>Event ID</th>
              <th> Name</th>
              <th>Email</th>
              <th>Venmo Handle</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map(attendee => (
              <tr key={attendee.id}>
                <td>{attendee.id}</td>
                <td>{attendee.event_id}</td>
                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.venmo_handle}</td>
                <td>{attendee.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
