// pages/_app.tsx

"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import RSVP from "../components/RSVP"
import AuthButton from "../components/AuthButton"; // Import the AuthButton component
import DateTimeSection from "../components/DateTimeSection";


export default function Home() {

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>
        <Image
          src="/images/Midweek_HotPot.png"
          alt="title"
          layout="fill"
          objectFit="contain"
        />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.dateParkingMenuContainer}>
          <div className={styles.dateTime}> <DateTimeSection/> </div>
          <div className={styles.infoParking}> Parking </div>
          <div className={styles.menu}> Menu </div>
        </div>

        <div className={styles.attendingContainer}>
          Attendance
        </div>


      </div>
      <div className={styles.footer}>
        <div className={styles.buttonContainer}>
        {/* <AuthButton />  */}
        <RSVP />
        </div>


      </div>

    </div>
  );
}