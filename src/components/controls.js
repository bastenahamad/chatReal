import React, {useState} from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { useNavigate } from "react-router-dom";

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [chat, setChat] = useState(false);
  const navigate = useNavigate();
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const viewChat = () => {
    setChat(!chat);
    navigate("/meet", {state: {chat:!chat}})
  };

  const micFnc = () => {
    setMic(!mic);
    toggleMic();
  };
  
  const camFnc = () => {
    setCam(!cam);
    toggleWebcam();
  };

  const sytleState = {
    height: "75px",
    backgroundColor: "#11ffee00",
  };

  return (
    <div className="fixed-bottom" style={sytleState}>
      <div
        type="button"
        className="leave btn btn-danger"
        onClick={() => leave()}
      >
        Exit <i class="fa-solid fa-arrow-right-from-bracket fa-2xl"></i>
      </div>
      <div
        type="button"
        className="mic btn"
        onClick={micFnc}
        style={{ backgroundColor: "transparent" }}
      >
        {mic ? (
          <i
            className="fa-solid fa-microphone-lines fa-2xl"
            style={{ color: "#2bff00" }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-microphone-lines-slash fa-2xl"
            style={{ color: "#ff0000" }}
          ></i>
        )}
      </div>
      <div
        type="button"
        className="toggle btn"
        onClick={camFnc}
        style={{ backgroundColor: "transparent" }}
      >
        {cam ? (
          <i
            className="fa-solid fa-video fa-2xl"
            style={{ color: "#2bff00" }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-video-slash fa-2xl"
            style={{ color: "#ff0000" }}
          ></i>
        )}
      </div>
      <div
        type="button"
        className="leave btn"
        onClick={viewChat}
        style={{ backgroundColor: "transparent" }}
      >
        {chat ? (
          <i
            className="fa-solid fa-comment-slash fa-2xl"
            style={{ color: "#ff0000" }}
          ></i>
        ) : (
          <i
            className="fa-solid fa-comment fa-2xl"
            style={{ color: "#1b85bf" }}
          ></i>
        )}
      </div>
    </div>
  );
}
export default Controls;