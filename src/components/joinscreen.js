import React, { useState } from "react";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <div className="join-screen lato-regular">
        <div className="div-1">
          <div className="row">
            <div
              className="col-6 login-box"
              style={{ boxShadow: "8px 0 0 rgba(0, 0, 0, 0.4)" }}
            >
              <h3 className="heading">Join Meeting</h3>
              <input
                className="user-box"
                type="text"
                placeholder="Enter Meeting ID"
                required
                onChange={(e) => {
                  setMeetingId(e.target.value);
                }}
              />
              <button onClick={onClick} className="join btn btn-warning">
                Join <i class="fa-solid fa-right-to-bracket fa-lg fa-plus"></i>
              </button>
            </div>
            <div className="col-6">
              <h3 className="heading">Create Meeting</h3>
              <button onClick={onClick} className="meet btn btn-warning">
                New <i class="fa-solid fa-lg fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default JoinScreen;