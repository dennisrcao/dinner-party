// pages/_app.tsx

"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import RSVPButton from "../components/Main_Bottom_RSVP/RSVPButton"
import DateTimeSection from "../components/Main_Section_DateTime/DateTimeSection";
import InfoParkingSection from "../components/Main_Section_DateTime/InfoParkingSection";
import MenuSection from "../components/Main_Section_DateTime/MenuSection";
import AttendanceSection from "../components/Main_Section_DateTime/AttendanceSection";
import axios from 'axios';

import styles from "./page.module.scss";

export default function Home() {
  const [attendees, setAttendees] = useState([]);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('http://localhost:5001/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  useEffect(() => {
    fetchAttendees();
  },[]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>
        <Image
          src="/images/Midweek_HotPot.png"
          alt="title"
          width={2027}
          height={529}
        />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.dateParkingMenuContainer}>
          <div className={styles.dateTime}> <DateTimeSection/> </div>
          <div className={styles.infoParking}> <InfoParkingSection/> </div>
          <div className={styles.menu}> <MenuSection/> </div>
        </div>
        <div className={styles.attendanceContainer}>
          <AttendanceSection attendees={attendees} fetchAttendees={fetchAttendees}/>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.buttonContainer}>
        <RSVPButton fetchAttendees={fetchAttendees}/>
        </div>
      </div>
    </div>
  );
}
