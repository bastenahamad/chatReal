import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Welcome() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({});

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
    } catch (error) {
      console.error("Google Sign In Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setUserData({
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }
  }, [user]);
    

  return (
    <div className="join-screen lato-regular">
      <div className="div-1">
        <h1 style={{ marginTop: "-50px"}}>Welcome to chatReal</h1>
        <h4 style={{ marginTop: "30px", fontSize: "Large" }}>
          Video conference and chat seamlessly with ease!
        </h4>
        <div className="row" style={{ padding: "2% 40%" }}>
          <div className="col-4">
            <i class="fa-solid fa-handshake fa-2xl" Style="color: #ffca2c;"></i>
          </div>
          <div className="col-4">
            <i class="fa-solid fa-globe fa-2xl" Style="color: #ffca2c;"></i>
          </div>
          <div className="col-4">
            <i class="fa-solid fa-comments fa-2xl" Style="color: #ffca2c;"></i>
          </div>
        </div>
        <h5 style={{ marginTop: "20px" }}>
          <b>Please Login to Continue</b>
        </h5>
        <button
          type="button"
          className="login-with-google-btn"
          onClick={googleSignIn}
          style={{ marginTop: "10px" }}
        >
          Sign in with Google
        </button>
        <div style={{ paddingTop: "20px" }}>
          {" "}
          by Basten Ahamad @ {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
export default Welcome;
