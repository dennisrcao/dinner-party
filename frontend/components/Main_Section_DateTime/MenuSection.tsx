"use client";
import styles from "./MenuSection.module.scss";


const MenuSection = () => {

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTitle}>
        Menu
      </div>

      <div className={styles.menuBody}>
        Insert nicely designed menu here
      </div>

    </div>
  );
};

export default MenuSection;

