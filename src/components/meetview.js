import {useState, useEffect} from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./participant";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import Controls from "./controls";
import ChatBox from "./Chat/chatbox";
import { useLocation } from "react-router-dom";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [copy, setCopy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [chatJoin, setChatJoin] = useState(false); 

  useEffect(() => {
  }, [copy]);

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setChatJoin(true);
    navigate("/meet");
    setJoined("JOINING");
    join();
  };

  return (
    <div className="row">
      <div
        className="col-9"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
      >
        <div className="row">
          <div className="col-8" style={{ textAlign: "right" }}>
            <h3 style={{ fontSize: "20px" }}>
              Meeting ID: <span className="meet-id">{props.meetingId}</span>{" "}
            </h3>
          </div>
          <div className="col-1">
            <CopyToClipboard
              text={props.meetingId}
              onCopy={() => setCopy(!copy)}
            >
              <div
                className="col-2"
                style={{ textAlign: "left" }}
                type="button"
              >
                {copy ? (
                  <i className="fa-solid fa-clipboard fa-xl"></i>
                ) : (
                  <i className="fa-regular fa-clipboard fa-xl"></i>
                )}
              </div>
            </CopyToClipboard>
          </div>

          {joined && joined === "JOINED" ? (
            <div>
              <Controls />
              <div className="row">
                <div
                  className="col-4"
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {[...participants.keys()].map((participantId) => (
                    <ParticipantView
                      participantId={participantId}
                      key={participantId}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : joined && joined === "JOINING" ? (
            <p>
              Joining the meeting...{" "}
              <i class="fa-solid fa-lg fa-spinner fa-spin"></i>
            </p>
          ) : (
            <div className="col-3">
              <button
                onClick={joinMeeting}
                className="btn btn-warning lato-regular"
                style={{ marginTop: "10px", width: "280px" }}
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className="col-3"
        style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}
      >
        {location.state && location.state.chat && chatJoin ? <ChatBox meetingId={props.meetingId} /> : null}
      </div>
    </div>
  );
}
export default MeetingView;