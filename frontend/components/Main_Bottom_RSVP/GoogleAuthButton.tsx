import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../store/authSlice';

import styles from './GoogleAuthButton.module.scss';

const GoogleAuthButton = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (session) {
      dispatch(logIn());
    } else {
      dispatch(logOut());
    }
  }, [session, dispatch]);

  console.log("session:", session);

  return (
    <>
      {!session ?
      (
        <button
          className={styles.signInButton}
          onClick={() => signIn("google", { callbackUrl: window.location.href, state: 'someStateValue' })}
        >
        Google Sign In & RSVP
        </button>
      ) :
      (
        <div className={styles.sessionDetails}>
          {/* <p>Signed in as {session.user.name}</p> */}
          <div className={styles.pictureContainer}>
            <img  src={session.user.picture} alt="Profile Picture" />
          </div>
          {/* <p>Email: {session.user.email}</p> */}
          <button
            onClick={() => signOut()}
            className={styles.buttonSignOut}
          >
          Sign out
          </button>
        </div>
      )}
    </>
  );
};

export default GoogleAuthButton;
