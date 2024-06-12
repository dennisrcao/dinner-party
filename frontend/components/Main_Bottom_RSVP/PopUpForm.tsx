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

const PopUpForm: React.FC<PopUpFormProps> = ({ popUpVisible, handleClose, session, fetchAttendees}) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [venmo, setVenmo] = useState('');
  const [phone, setPhone] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (session?.user){
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setPhotoURL(session.user.picture || '');
    }
  }, [session])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit-----");
    console.log("name:", name);
    console.log("photoURL:", photoURL);
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/attendees', {
        name,
        email,
        venmo,
        phone,
        photoURL
      });

      console.log('New attendee created:', response.data);
      fetchAttendees(); //re-fetch attendees after submission (invoked at parent page.tsx)
                        //so that <AttendanceSection/> will retrigger
      handleClose(); // Close the form after successful submission
    } catch (error) {
      console.log("error with data package:", {
        name,
        email,
        venmo,
        phone,
        photoURL
      });
      console.error('Error creating attendee:', error);
    }
  };

  if (!popUpVisible) return null;

  return (
    <div className={styles.popUpOverlay}>
      <div className={styles.popUp}>
        <div className={styles.closeButtonContainer}>
          <CloseIcon className={styles.closeIcon} onClick={handleClose}/>
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

            <div className={styles.submitContainer}>
              <button className={styles.submitButton} type="submit">Submit</button>
            </div>


          </form>
          {/* <button onClick={handleClose}>Close</button> */}
        </div>
      </div>
    </div>
  );
};

export default PopUpForm;
