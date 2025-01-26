import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InquiryDetail from "./pages/InquiryDetail";
import GuestComplete from "./pages/GuestComplete";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* InquiryDetailのルート */}
        <Route path="/staff/inquiry/:inquiryId" element={<InquiryDetail />} />
        
        {/* GuestCompleteのルート */}
        <Route path="/guest/complete" element={<GuestComplete />} />
      </Routes>
    </Router>
  );
}

export default App;