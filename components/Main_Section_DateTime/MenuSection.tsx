"use client";
import styles from "./MenuSection.module.scss";


const MenuSection = () => {

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuTitle}>
        Menu
      </div>

      <div className={styles.menuBody}>
      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>𝐁𝐫𝐨𝐭𝐡𝐬</span>
      (麻辣)málà Sichuan red <br/>
      (麻辣)málà Sichuan green <br/>
      Pork bone <br/>
      <br/>
      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>𝐌𝐞𝐚𝐭𝐬</span>
      Pork belly thinly sliced <br/>
      Beef belly thinly sliced <br/>
      <br/>
      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>𝐕𝐞𝐠𝐠𝐢𝐞𝐬</span>
      冬瓜 (winter melon)<br/>
      Oyster mushrooms <br/>
      Gai Lan <br/>
      Spinach <br/>
      Potatoes <br/>
      Fried tofu puffs <br/>
      Napa Cabbage <br/>
      <br/>
      <span style={{ fontWeight: "bold", textDecoration: "underline" }}>𝐃𝐢𝐩𝐩𝐢𝐧𝐠 𝐒𝐚𝐮𝐜𝐞</span>


      沙茶酱, chili oil, soy sauce mirin <br/> cilantro, green onion, sesame oil
      <br/>
      <br/>
      <span style={{ fontWeight: "bold" }}>𝐑𝐢𝐜𝐞</span>
        <br />
      <span style={{ fontWeight: "bold" }}>𝐁𝐞𝐞𝐫𝐬</span>
      </div>

    </div>
  );
};

export default MenuSection;

