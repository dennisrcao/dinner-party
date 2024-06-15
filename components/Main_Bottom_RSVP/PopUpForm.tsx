import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GoogleAuthButton from './GoogleAuthButton';
import axios from 'axios';
import styles from './PopUpForm.module.scss';
import CloseIcon from '../../public/images/close-icon.svg';

interface PopUpFormProps {
  popUpVisible: boolean;
  handleClose: () => void;
  session: any;
  fetchAttendees: () => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({ popUpVisible, handleClose, session, fetchAttendees }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [venmo, setVenmo] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const [drinkAlcohol, setDrinkAlcohol] = useState('');
  const [alcoholDetails, setAlcoholDetails] = useState('');
  const [bringAnything, setBringAnything] = useState('');

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setPhotoURL(session.user.picture || '');
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const backendURL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/attendees`;
      const response = await axios.post(backendURL, {
        name,
        email,
        venmo,
        phone,
        photoURL,
        drinkAlcohol,
        alcoholDetails,
        bringAnything
      });

      console.log('New attendee created:', response.data);
      fetchAttendees(); // re-fetch attendees after submission
      handleClose(); // Close the form after successful submission
    } catch (error) {
      console.log("error with data package:", {
        name,
        email,
        venmo,
        phone,
        photoURL,
        drinkAlcohol,
        alcoholDetails,
        bringAnything
      });
      console.error('Error creating attendee:', error);
    }
  };

  if (!popUpVisible) return null;

  return (
    <div className={styles.popUpOverlay}>
      <div className={styles.popUp}>
        <div className={styles.closeButtonContainer}>
          <CloseIcon className={styles.closeIcon} onClick={handleClose} />
        </div>
        <div className={styles.googleAuthButtonContainer}>
          <GoogleAuthButton />
        </div>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit}>
            <div className={styles.entryContainer}>
              <div className={styles.entryKey}> Name: </div>
              <div className={styles.entryValue}>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>Email:</div>
              <div className={styles.entryValue}>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>Venmo handle @: </div>
              <div className={styles.entryValue}>
                <input type="text" name="venmo" value={venmo} onChange={(e) => setVenmo(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>Phone #:</div>
              <div className={styles.entryValue}>
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>You drinking alcohol ? :</div>
              <div className={styles.entryValue}>
                <input type="text" name="drinkAlcohol" value={drinkAlcohol} onChange={(e) => setDrinkAlcohol(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>If so, list beer or wine and how many you'd want :</div>
              <div className={styles.entryValue}>
                <input type="text" name="alcoholDetails" value={alcoholDetails} onChange={(e) => setAlcoholDetails(e.target.value)} />
              </div>
            </div>

            <div className={styles.entryContainer}>
              <div className={styles.entryKey}>Are you bringing anything (not required) </div>
              <div className={styles.entryValue}>
                <input type="text" name="bringAnything" value={bringAnything} onChange={(e) => setBringAnything(e.target.value)} />
              </div>
            </div>

            <div className={styles.submitContainer}>
              <button className={styles.submitButton} type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PopUpForm;
