// frontend/components/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
  event_id: number;
  date: string;
  start_time: string;
  end_time: string;
}

interface Attendee {
  id: number;
  event_id: number;
  first_name: string;
  last_name: string;
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
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Events</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.event_id}>
              <td>{event.event_id}</td>
              <td>{event.date}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Attendees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event ID</th>
            <th>First Name</th>
            <th>Last Name</th>
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
              <td>{attendee.first_name}</td>
              <td>{attendee.last_name}</td>
              <td>{attendee.email}</td>
              <td>{attendee.venmo_handle}</td>
              <td>{attendee.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
