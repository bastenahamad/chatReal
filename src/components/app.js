import React from "react";
import Nav from "./navbar";
import { Routes, Route } from "react-router-dom";
import MeetPage from "./meetpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Nav />} />
      <Route path="/meet" element={<MeetPage />} />
    </Routes>
  );
}

export default App;