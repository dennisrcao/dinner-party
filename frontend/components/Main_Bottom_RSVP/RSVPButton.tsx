import { useState, useEffect } from 'react';
import PopUpForm from './PopUpForm';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../store/authSlice';


import styles from './RSVPButton.module.scss';


const RSVP = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    const savedPopupState = localStorage.getItem('showPopUp');
    if (savedPopupState === 'true') {
      setShowPopUp(true);
    }
    if (session) {
      dispatch(logIn());
    } else {
      dispatch(logOut());
    }
  }, [session, dispatch]);

  const handleClick = () => {
    setShowPopUp(true);
    localStorage.setItem('showPopUp', 'true');
  };

  const handleClose = () => {
    setShowPopUp(false);
    localStorage.setItem('showPopUp', 'false');
  };

  return (
    <>
      <div className={styles.rsvpBtnContainer}>
        <button
          className={styles.rsvpBtn}
          onClick={handleClick}
        >
          RSVP and <br /> Google Sign-In
        </button>
      </div>

      {showPopUp && (
        <PopUpForm
          popUpVisible={showPopUp}
          handleClose={handleClose}
          session={session}
        />
      )}
    </>
  );
};

export default RSVP;
