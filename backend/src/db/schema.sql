-- Drop existing tables if they exist
DROP TABLE IF EXISTS attendees;
DROP TABLE IF EXISTS events;

-- Create events table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    date DATE,
    start_time TIME,
    end_time TIME
);

-- Create attendees table
CREATE TABLE attendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(event_id),
    name VARCHAR(100),
    email VARCHAR(100),
    venmo_handle VARCHAR(50),
    phone_number VARCHAR(20),
    photo_url VARCHAR -- Adding the new column
);
