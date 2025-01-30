import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GuestInquiry from './pages/GuestInquiry';
import StaffLogin from './pages/StaffLogin';
import StaffInquiryManagement from './pages/StaffInquiryManagement';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guest-inquiry" element={<GuestInquiry />} />
                <Route path="/staff-login" element={<StaffLogin />} />
                <Route path="/staff-inquiry-management" element={<StaffInquiryManagement />} /> {/* 追加 */}
            </Routes>
        </Router>
    );
}

export default App;