import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import { Link, useNavigate } from "react-router-dom";
import "./ReviewForm.css";

const doctorList = [
  {
    serial: 1,
    name: "Dr. John Doe",
    speciality: "Cardiology",
    reviews: [],
  },
  {
    serial: 2,
    name: "Dr. Jane Smith",
    speciality: "Dermatology",
    reviews: [],
  },
];

const ReviewForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  
  const handleFormSubmit = (doctorName, reviewData) => {
    const newReview = {
      id: uuidv4(),
      ...reviewData,
    };
    const updatedReviews = [...reviews, newReview];
    doctorList
    setReviews(updatedReviews);
    setShowModal(false);
  };

  return (
    <section className="container" style={{ marginTop: "10dvh" }}>
      <div>
        <h1>Reviews</h1>
        <table>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </table>
        {doctorList.map((item) => (
          <tr>
            <td>{item.serial}</td>
            <td>{item.name}</td>
            <td>{item.speciality}</td>
            <td>
              <Popup
                style={{ backgroundColor: "#FFFFFF" }}
                trigger={
                  <button
                    className={`give-review-btn ${
                      item.reviews.length > 0 ? "reviewed" : ""
                    }`}
                    disabled={item.reviews.length > 0}
                  >
                    Give Review
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
                    {item.reviews.length > 0 ? (
                      <>
                      </>
                    ) : (
                      <GiveReviews
                        doctorName={item.name}
                        doctorSpeciality={item.speciality}
                        onSubmit={handleFormSubmit}
                      />
                    )}
                  </div>
                )}
              </Popup>
            </td>
            <td>{item.reviews.length > 0 && item.reviews[0]}</td>
          </tr>
        ))}
      </div>
    </section>
  );
};

function GiveReviews({doctorName, onSubmit}) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });
  // Function to handle button click event
  const handleButtonClick = () => {
    setShowForm(true);
  };
  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({doctorName, ...formData})
    setSubmittedMessage(formData);
    setFormData({
      name: '',
      review: '',
      rating: 0
    });
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };
  return (
    <div>
      <h2>Form with Message</h2>
      {!showForm ? (
        // Display button to open the form
        <button onClick={handleButtonClick}>Open Form</button>
      ) : (
        // Display form for giving feedback
        <form onSubmit={handleSubmit}>
          <h2>Give Your Feedback</h2>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
          </div>
          {/* Submit button for form submission */}
          <button type="submit">Submit</button>
        </form>
      )}
      {/* Display the submitted message if available */}
      {submittedMessage && (
        <div>
          <h3>Submitted Message:</h3>
          <p>{submittedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default ReviewForm;
