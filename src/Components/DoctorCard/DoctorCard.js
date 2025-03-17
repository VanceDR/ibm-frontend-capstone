import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";
import { v4 as uuidv4 } from "uuid";

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    localStorage.setItem("doctorData", "");
    localStorage.setItem(name, "");
    setAppointments(updatedAppointments);
    window.dispatchEvent(new Event("storage"));
  };

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem(
      "doctorData",
      JSON.stringify({ name, speciality, experience, ratings })
    );
    localStorage.setItem(name, JSON.stringify(appointmentData));
    setShowModal(false);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const storedDoctorData =
      localStorage.getItem("doctorData") != ""
        ? JSON.parse(localStorage.getItem("doctorData"))
        : "";
    const storedAppointmentData = storedDoctorData
      ? JSON.parse(localStorage.getItem(storedDoctorData?.name))
      : "";
    // Set doctorData state if storedDoctorData exists
    if (storedDoctorData?.name == name) {
      // Set appointmentData state if storedAppointmentData exists
      if (storedAppointmentData) {
        const newAppointment = {
          id: uuidv4(),
          ...storedAppointmentData,
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
      }
    }
  }, []);

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <i className="bi bi-person-fill"></i>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">{ratings}</div>
        </div>
        {/* for reference  */}
        {/* <div>
              <button className='book-appointment-btn'>                    
                <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
              </div> */}
      </div>

      <div className="doctor-card-options-container">
        <Popup
          style={{ backgroundColor: "#FFFFFF" }}
          trigger={
            <button
              className={`book-appointment-btn ${
                appointments.length > 0 ? "cancel-appointment" : ""
              }`}
            >
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div
              className="doctorbg"
              style={{ padding: "1rem", overflow: "auto" }}
            >
              <div>
                <div className="doctor-card-profile-image-container">
                  <i className="bi bi-person-fill"></i>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">
                    {speciality}
                  </div>
                  <div className="doctor-card-detail-experience">
                    {experience} years experience
                  </div>
                  <div className="doctor-card-detail-consultationfees">
                    {ratings}
                  </div>
                </div>
              </div>
              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date of Appointment: {appointment.appointmentDate}</p>
                      <p>Time Slot: {appointment.selectedSlot}</p>
                      <button onClick={() => handleCancel(appointment.id)}>
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;
