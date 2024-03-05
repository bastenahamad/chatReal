import React from "react";
import { Link } from "react-router-dom";

function Go() {
  return (
    <div className="join-screen lato-regular">
      <div className="div-1">
        <h1 style={{ marginTop: "-50px" }}>Welcome to chatReal</h1>
        <Link to="/meet">
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginTop: "10px", width:"200px" }}
          >
            Let's Start!
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Go;
