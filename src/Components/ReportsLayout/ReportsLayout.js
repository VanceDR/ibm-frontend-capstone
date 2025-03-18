import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import { Link, useNavigate } from "react-router-dom";
import "./ReportsLayout.css";

const reportsList = [
  {
    serial: 1,
    name: "Dr. John Doe",
    speciality: "Cardiology",
    report: 'patient_report.pdf'
  },
  {
    serial: 2,
    name: "Dr. Jane Smith",
    speciality: "Dermatology",
    report: 'patient_report.pdf'
  },
];

const ReportsLayout = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [reports, setReviews] = useState(doctorList);
  const navigate = useNavigate();
//   const handleFormSubmit = (newDoctor) => {
//     let updatedReviews = reviews.map((doctor) => {
//       if (doctor.name == newDoctor.name) return newDoctor;
//       else return doctor;
//     });
//     setReviews(updatedReviews);
//     setShowModal(false);
//   };
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }
  }, []);
  return (
    <section className="reports-con">
      <div>
        <h1>Reports</h1>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reportsList.map((item) => (
              <tr key={item.serial}>
                <td>{item.serial}</td>
                <td>{item.name}</td>
                <td>{item.speciality}</td>
                <td>
                  <a href={item.report} target="_blank"><button>View Report</button></a>
                </td>
                <td><a href={item.report} download><button>Download Report</button></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ReportsLayout;
