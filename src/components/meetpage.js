import React, { useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../api";
import JoinScreen from "./joinscreen";
import MeetingView from "./meetview";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function MeetPage() {
  const [user] = useAuthState(auth);
  const [meetingId, setMeetingId] = useState(null);
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: user.displayName,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}
export default MeetPage;