import { useState } from 'react';
import styles from './PopUpForm.module.scss';
import GoogleAuthButton from './GoogleAuthButton';


interface PopUpFormProps {
  popUpVisible: boolean;
  handleClose: () => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({ popUpVisible, handleClose }) => {
  if (!popUpVisible) return null;

  return (
    <div className={styles.popUpOverlay}>
      <div className={styles.popUp}>
        <div className={styles.popUpCloseButton}>
          X button
        </div>
        <div className={styles.googleAuthButton}>
          <GoogleAuthButton/>
        </div>
        <div className={styles.popUpContent}>
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
  );





};

export default PopUpForm;



