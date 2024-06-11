import { useState } from 'react';
import styles from './RSVP.module.scss';


const RSVP = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleClick = () => {
    setPopupVisible(true);
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.rsvp}>
          <button
            style={{ width: "50px", height: "50px" }}
            onClick={handleClick}
          />
        </div>
      </div>

      {popupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <form>
                <label>
                  Name:
                  <input type="text" name="name" />
                </label>
                <br />
                <label>
                  Email:
                  <input type="email" name="email" />
                </label>
                <br />
                <label>
                  RSVP:
                  <select name="rsvp">
                    <option value="going">Going</option>
                    <option value="not_going">Not Going</option>
                    <option value="maybe">Maybe</option>
                  </select>
                </label>
                <br />
                <button type="submit">Submit</button>
              </form>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RSVP;
