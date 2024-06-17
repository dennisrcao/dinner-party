"use client";
import styles from "./InfoParkingSection.module.scss";


const InfoParkingSection = () => {

  return (
    <div className={styles.infoParkingContainer}>
      <div className={styles.infoTitle}>
        Info
      </div>
      <div className={styles.infoBody}>
      • 3 yin yang hot pots on my rooftop, I buy and prepare everything.<br/><br/>
      • Even split (me included). Usually ~ $20 for all food and alcohol combined.<br/><br/>
      • If you can make it, please RSVP below and fill out the questionnaire.<br/><br/>

      </div>
      <div className={styles.parkingTitle}>
        Parking
      </div>
      <div className={styles.parkingBody}>
      • There's one secret spot in the gravel, first come first serve - call when outside 213-713-9936 <br/> <br/>
      • Otherwise street parking. Uber/Lyft maybe preferred.
      </div>

    </div>
  );
};

export default InfoParkingSection;

