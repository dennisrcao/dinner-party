"use client";
import CustomCalendar from "./CustomCalendar";
import styles from "./DateTimeSection.module.scss";

const DateTimeSection = () => {

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.sectionTitle}>
        Date & Time
      </div>
      <div className={styles.sectionDateAndTime}>
      <div className={styles.sectionDate}>
        Wednesday, June 19th
      </div>
      <div className={styles.sectionTime}>
        7:00PM - 11:00PM
      </div>
      </div>
      <div className={styles.sectionCalendar}>
        <CustomCalendar/>
      </div>
      <div className={styles.addToGoogleCalendar}>

      </div>


    </div>
  );
};

export default DateTimeSection;

