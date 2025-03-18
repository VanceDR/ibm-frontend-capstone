import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/InstantConsultation/InstantConsultation";
import Consultation from "./Components/Consultation/Consultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileForm/ProfileForm";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification>
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reviews" element={<ReviewForm />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route
              path="/instant-consultation"
              element={<InstantConsultation />}
            />
            <Route path="/edit-profile" element={<ProfileForm />} />
            <Route path="/reports" element={<ReportsLayout />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
