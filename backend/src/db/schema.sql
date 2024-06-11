-- schema.sql

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  event_id SERIAL PRIMARY KEY,
  type VARCHAR(255),
  date VARCHAR(255) NOT NULL,
  start_time VARCHAR(255) NOT NULL,
  end_time VARCHAR(255) NOT NULL
);

-- Create attendees table
CREATE TABLE IF NOT EXISTS attendees (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(event_id) ON DELETE CASCADE,
  name VARCHAR(255),

  email VARCHAR(255),
  venmo_handle VARCHAR(255),
  phone_number VARCHAR(255)
);
