import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import GoogleAuthButton from './GoogleAuthButton';
import axios from 'axios';
import styles from './PopUpForm.module.scss';

interface PopUpFormProps {
  popUpVisible: boolean;
  handleClose: () => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({ popUpVisible, handleClose }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [venmo, setVenmo] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/attendees', {
        name,
        email,
        venmo,
        phone,
      });

      console.log('New attendee created:', response.data);
      handleClose(); // Close the form after successful submission
    } catch (error) {
      console.error('Error creating attendee:', error);
    }
  };

  if (!popUpVisible) return null;

  return (
    <div className={styles.popUpOverlay}>
      <div className={styles.popUp}>
        <div className={styles.popUpCloseButton}>
          X button
        </div>
        <div className={styles.googleAuthButtonContainer}>
          <GoogleAuthButton />
        </div>
        <div className={styles.popUpContent}>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Venmo handle @:
              <input type="text" name="venmo" value={venmo} onChange={(e) => setVenmo(e.target.value)} />
            </label>
            <br />
            <label>
              Phone #:
              <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
