"use client";
import CustomCalendar from "./CustomCalendar";
import styles from "./DateTimeSection.module.scss";
import { useEffect, useState } from "react";

interface Event {
  date: string;
  start_time: string;
  end_time: string;
  type: string;
}

const DateTimeSection = () => {
  const [event, setEvent] = useState<Event | null>(null);

  console.log("<DateTimeSection>");
  console.log("state [event]:", event);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log("<DateTimeSection> fetchEvent ");
      const eventURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/events`;
      console.log("eventURL:", eventURL);

      try {
        const response = await fetch(eventURL);
        if (!response.ok) {
          console.log("!response.ok");
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('Data:', data);
        setEvent(data[0]);
      } catch (error) {
        console.log("!catch.error");
        console.error('Failed to fetch event data:', error);
      }
    };

    fetchEvent();
  }, []);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>
        Date & Time
      </div>
      <div className={styles.sectionDateAndTime}>
        <div className={styles.sectionDate}>
          {event.date}
        </div>
        <div className={styles.sectionTime}>
          {event.start_time} - {event.end_time}
        </div>
      </div>
      <div className={styles.sectionCalendar}>
        <CustomCalendar date={event.date} />
      </div>
      <div className={styles.addToGoogleCalendar}>
      </div>
    </div>
  );
};

export default DateTimeSection;