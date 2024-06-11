import { useState, useEffect } from 'react';
import styles from './RSVPButton.module.scss';
import PopUpForm from './PopUpForm';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logIn, logOut } from '../../store/authSlice';
import { useSession } from 'next-auth/react';

const RSVP = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { data: session } = useSession();
  const [buttonToggleOn, setButtonToggleOn] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  console.log("RSVP with isLoggedIn:", isLoggedIn);

  useEffect(() => {
    if (session) {
      dispatch(logIn());
    } else {
      dispatch(logOut());
    }
  }, [session, dispatch]);

  useEffect(() => {
    if (buttonToggleOn || isLoggedIn) {
      setShowPopUp(true);
    } else {
      setShowPopUp(false);
    }
  }, [buttonToggleOn, isLoggedIn]);

  const handleClick = () => {
    setButtonToggleOn(true);
  };

  const handleClose = () => {
    setButtonToggleOn(false);
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
      {console.log("showPopUp!", showPopUp)}

      {
        showPopUp &&
        <PopUpForm
          popUpVisible={showPopUp}
          handleClose={handleClose}
        />
      }
    </>
  );
};

export default RSVP;
