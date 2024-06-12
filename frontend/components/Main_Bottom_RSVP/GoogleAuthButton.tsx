import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn, logOut } from '../../store/authSlice';
import Image from 'next/image';

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
        <div
          className={styles.signInContainer}
          onClick={() => signIn("google", { callbackUrl: window.location.href, state: 'someStateValue' })}
        >
          <Image
            src="/images/SignInWithGoogle.png"
            alt="GoogleSignIn"
            width={248} // Set the width of your image
            height={60} // Set the height of your image
            className={styles.imageGoogle}
          />
        </div>
      ) :
      (
        <div className={styles.loggedInDetails}>
          <div className={styles.pictureContainer}>
            <Image
              src={session.user.picture}
              alt={"ProfilePic"}
              width={100}
              height={100}
              className={styles.userPic}
            />

          </div>
          <div className={styles.buttonSignOutContainer}>
            <button
              onClick={() => signOut()}
              className={styles.buttonSignOut}
            >
            Sign out
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default GoogleAuthButton;

