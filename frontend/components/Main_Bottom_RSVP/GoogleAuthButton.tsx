import { signIn, signOut, useSession } from "next-auth/react";
import styles from './GoogleAuthButton.module.scss';

const GoogleAuthButton = () => {
  const { data: session } = useSession();
  console.log("session:", session);

  return (
    <div>
      {!session ?
      (
        <button
          className={styles.signInButton}
          onClick={() => signIn("google")}
        >
        Google Sign In & RSVP
        </button>
      ) :
      (
        <div>
          <p>Signed in as {session.user.name}</p>
          <img src={session.user.picture} alt="Profile Picture" />
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default GoogleAuthButton;
