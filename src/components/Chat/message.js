import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className={`row chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <div className="col-2">
        <img
          className="chat-bubble-img"
          src={message.avatar}
          alt="user avatar"
        />
      </div>
      <div className="col-8">
        <p className="chat-username">{message.name}</p>
      </div>
      <div className="col-12 chat-bubble__right">
        <p className="chat-user-message"><b>{message.text}</b></p>
      </div>
    </div>
  );
};
export default Message;
