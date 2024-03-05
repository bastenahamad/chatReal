import React from "react";
import Login from "./login";
import Welcome from "./welcome";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Go from "./go";

function Nav() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="navbar row">
        <div className="col-6">
          <h1 className="title-logo">chatReal®</h1>
        </div>
        <div className="col-6">
          <Login />
        </div>
      </div>
      {!user ? <Welcome/> : <Go/>}
    </div>
  );
}
export default Nav;