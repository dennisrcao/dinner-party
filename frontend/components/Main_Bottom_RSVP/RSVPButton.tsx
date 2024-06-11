import { useState } from 'react';
import styles from './RSVPButton.module.scss';
import PopUpForm from './PopUpForm';
import GoogleAuthButton from './GoogleAuthButton';

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
      <div className={styles.rsvpBtnContainer}>
        <button
          className={styles.rsvpBtn}
          onClick={handleClick}
        >
          RSVP and  <br/> Google Sign-In
        </button>
      </div>

      {
        popupVisible &&
        <PopUpForm
          popUpVisible={popupVisible}
          handleClose={handleClose}
        />
      }
      <GoogleAuthButton/>
    </>
  );
};

export default RSVP;
