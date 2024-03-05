import React, { useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";
import { useParticipant } from "@videosdk.live/react-sdk";

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div
      className="lato-regular"
      style={{
        display: "inline-block",
        marginBottom: "10px",
        marginRight: "10px",
      }}
    >
      <div>
        <audio ref={micRef} autoPlay playsInline muted={isLocal} />
        {webcamOn && (
          <div
            className="row"
            style={{
              backgroundColor: "#304b5a",
              borderRadius: "5px",
              boxShadow: "1px 1px black",
            }}
          >
            <div className="col-12">
              <ReactPlayer
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={videoStream}
                height={"300px"}
                width={"500px"}
                onError={(err) => {
                  console.log(err, "participant video error");
                }}
              />
            </div>
            <div className="row">
              <div
                className="col-8"
                style={{
                  paddingBottom: "1%",
                  textAlign: "left",
                  paddingLeft: "20px",
                }}
              >
                {displayName}
              </div>
              <div className="col-4">
                {!micOn ? (
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <i
                      className="fa-solid fa-microphone-lines-slash fa-xl"
                      style={{ color: "white" }}
                    ></i>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
        {!webcamOn ? (
          <div
            style={{
              height: "300px",
              width: "500px",
              boxShadow: "1px 1px black",
              backgroundColor: "#304b5a",
              borderRadius: "5px",
            }}
          >
            <i
              className="fa-solid fa-video-slash fa-5x"
              style={{
                color: "white",
                marginTop: "80px",
                marginBottom: "10px",
              }}
            ></i>
            <p>{displayName}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ParticipantView;
