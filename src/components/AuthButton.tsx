import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      ) : (
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

export default AuthButton;
