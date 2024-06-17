"use client";
import CustomCalendar from "./CustomCalendar";
import styles from "./DateTimeSection.module.scss";
import { useEffect, useState } from "react";
import { atcb_action } from "add-to-calendar-button-react";


interface Event {
  date: string;
  start_time: string;
  end_time: string;
  type: string;
}

const DateTimeSection = () => {
  const [event, setEvent] = useState<Event | null>(null);

  //--------------------------- CALL API/EVENTS ------------------------------------------
  useEffect(() => {
    const fetchEvent = async () => {
      const eventsURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/events`;
      try {
        const response = await fetch(eventsURL);
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
  //--------------------------- ADD EVENT TO CALENDAR LOGIC -------------------------------

  const handleAddToCalendar = () => {
    if (event) {
      const [dayOfWeek, month, day, year] = event.date.split(" ");
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
      const formattedDate = `${year}-${monthIndex.toString().padStart(2, "0")}-${day}`;

      const formatTime = (time: string) => {
        const [hour, minute] = time.split(":");
        return `${hour.padStart(2, "0")}:${minute}`;
      };

      atcb_action({
        name: "Hot Pot at Dennis Rooftop",
        startDate: formattedDate,
        endDate: formattedDate,
        startTime: formatTime(event.start_time),
        endTime: formatTime(event.end_time),
        location: "212 S Kenmore Ave",
        options: ["Google", "iCal", "Apple"],
        timeZone: "America/Los_Angeles",
      });
    }
  };

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
      <div className={styles.addToCalBtnContainer}>
        <button
          onClick={handleAddToCalendar}
          className={styles.addToCalBtn}
        >
          Add to Calendar
        </button>

      </div>
    </div>
  );
};

export default DateTimeSection;
