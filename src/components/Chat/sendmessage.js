import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = (props) => {
  const [message, setMessage] = useState("");
  const meetid = props.meetid;
   const sendMessage = async (event) => {
     event.preventDefault();
     if (message.trim() === "") {
       alert("Enter valid message");
       return;
     }
     const { uid, displayName, photoURL } = auth.currentUser;
     await addDoc(collection(db, meetid), {
       text: message,
       name: displayName,
       avatar: photoURL,
       createdAt: serverTimestamp(),
       uid,
     });
     setMessage("");
   };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        autoComplete="off"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary btn-lg">Send</button>
    </form>
  );
};
export default SendMessage;
