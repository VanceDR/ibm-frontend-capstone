import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  // useEffect hook to perform side effects in the component
  const handleNotification = () => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData =
      localStorage.getItem("doctorData") != ""
        ? JSON.parse(localStorage.getItem("doctorData"))
        : "";
    const storedAppointmentData =
      storedDoctorData != ""
        ? JSON.parse(localStorage.getItem(storedDoctorData?.name))
        : "";
    // Set isLoggedIn state to true and update username if storedUsername exists
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    } else {
      setDoctorData(null);
    }
    // Set appointmentData state if storedAppointmentData exists
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    } else {
      setAppointmentData(null);
    }
  };
  useEffect(() => {
    // Retrieve stored username, doctor data, and appointment data from sessionStorage and localStorage
    handleNotification();
    window.addEventListener("storage", handleNotification);
    return () => window.removeEventListener("storage", handleNotification);
  }, []);

  return (
    <div>
      {/* Render Navbar component */}
      <Navbar />
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && appointmentData && (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Specialty:</strong> {doctorData?.speciality}
              </p>
              <p className="appointment-card__message">
                <strong>Name:</strong> {appointmentData?.name}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Phone Number:</strong> {appointmentData?.phoneNumber}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Date of Appointment:</strong>{" "}
                {appointmentData?.appointmentDate}
              </p>
              <p className="appointment-card__message">
                {/* Display doctor's name from doctorData */}
                <strong>Time Slot:</strong> {appointmentData?.selectedSlot}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
