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
  const [reviews, setReviews] = useState(doctorList);
  const navigate = useNavigate();
  const handleFormSubmit = (newDoctor) => {
    let updatedReviews = reviews.map((doctor) => {
      if (doctor.name == newDoctor.name) return newDoctor;
      else return doctor;
    });
    setReviews(updatedReviews);
    setShowModal(false);
  };
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }
  }, []);
  return (
    <section className="review-con">
      <div>
        <h1>Reviews</h1>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>Provide Feedback</th>
              <th>Review Given</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((item) => (
              <tr key={item.serial}>
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
                      <div style={{ padding: "1rem", overflow: "auto" }}>
                        {item.reviews.length > 0 ? (
                          <>
                            <div>
                              <h3>Submitted Message:</h3>
                              <p>{item.reviews[0].review}</p>
                              <h3>Rating:</h3>
                              <p className="star-rating">
                                {new Array(item.reviews[0].rating)
                                  .fill(0)
                                  .map((a, i) => {
                                    return (
                                      <i
                                        key={i}
                                        className="bi bi-star-fill on"
                                      ></i>
                                    );
                                  })}
                              </p>
                            </div>
                          </>
                        ) : (
                          <GiveReviews
                            doctor={item}
                            onSubmit={handleFormSubmit}
                          />
                        )}
                      </div>
                    )}
                  </Popup>
                </td>
                <td>{item.reviews.length > 0 && item.reviews[0].review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

function GiveReviews({ doctor, onSubmit }) {
  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let newDoctor = { ...doctor, reviews: [{ ...formData, rating }] };
    console.log(newDoctor);
    onSubmit(newDoctor);
    setSubmittedMessage(formData);
    setFormData({
      name: "",
      review: "",
      rating: 0,
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
      <form onSubmit={handleSubmit}>
        <h2>Give Your Feedback</h2>
        {/* Display warning message if not all fields are filled */}
        {showWarning && <p className="warning">Please fill out all fields.</p>}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />
        </div>
        <div className="star-rating">
            <label>Rating: </label>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                data-value={index}
                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className="star"><i className="bi bi-star-fill"></i></span>
              </button>
            );
          })}
        </div>
        {/* Submit button for form submission */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ReviewForm;
