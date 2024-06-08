"use client";
import Image from "next/image";
import styles from "./page.module.scss";
import RSVP from "../components/RSVP"

export default function Home() {
  const handleClick = () => {
    console.log("click me!!!");
  }
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
      <div className={styles.info}>
        <div className={styles.date}/>
      </div>
      <div className={styles.footer}>
        <RSVP/>

      </div>

    </div>
  );
}
