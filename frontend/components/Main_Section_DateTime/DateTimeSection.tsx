"use client";
import CustomCalendar from "./CustomCalendar";
import styles from "./DateTimeSection.module.scss";
import { useEffect, useState } from "react";

interface Event {
  date: string;
  start_time: string;
  end_time: string;
}


const DateTimeSection = () => {
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('http://localhost:5001/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvent(data[0]);
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    };

    fetchEvent();
  }, []);



  if (!event) {
    return <div>Loading...</div>;
  }

  // console.log("event:", event);



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
        <CustomCalendar date={event.date}/>
      </div>
      <div className={styles.addToGoogleCalendar}>

      </div>


    </div>
  );
};

export default DateTimeSection;

