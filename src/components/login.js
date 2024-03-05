import React, {useState, useEffect} from "react";
import {auth} from "./firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login(props) {
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
    const signOut = () => {
      auth.signOut();
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
       <div className="loginPage">
         {!user ? (
           <div>
             <div className="user-view">
               <img
                 src="data:image/png;base64,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"
                 alt={"profile_picture"}
                 className="profile guest"
               ></img>
             </div>
             <button
               type="button"
               className="login-with-google-btn"
               onClick={googleSignIn}
             >
               Sign in with Google
             </button>
           </div>
         ) : (
           <div>
             <div className="user-view">
               <img
                 src={userData.photoURL}
                 alt={"profile_picture"}
                 className="profile"
               ></img>
               <h4>Welcome, {userData.displayName}</h4>
             </div>
             <button
               type="button"
               className="btn btn-secondary btn-sm"
               onClick={signOut}
             >
               Sign Out <i class="fa-solid fa-right-from-bracket"></i>
             </button>
           </div>
         )}
       </div>
     );
  }
