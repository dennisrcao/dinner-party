"use client";
import styles from "./InfoParkingSection.module.scss";


const InfoParkingSection = () => {

  return (
    <div className={styles.infoParkingContainer}>
      <div className={styles.infoTitle}>
        Info
      </div>
      <div className={styles.infoBody}>
        Split payment, etc
      </div>
      <div className={styles.parkingTitle}>
        Parking
      </div>
      <div className={styles.parkingBody}>
        Info on parking
      </div>

    </div>
  );
};

export default InfoParkingSection;

