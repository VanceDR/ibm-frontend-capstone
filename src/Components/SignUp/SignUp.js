import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./SignUp.css";
const SignUp = () => {
  // State variables using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showerr, setShowerr] = useState(""); // State to show error messages
  const navigate = useNavigate(); // Navigation hook from react-router
  // Function to handle form submission
  const register = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // API Call to register user
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
      }),
    });
    const json = await response.json(); // Parse the response JSON
    if (json.authtoken) {
      // Store user data in session storage
      sessionStorage.setItem("auth-token", json.authtoken);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("phone", phone);
      sessionStorage.setItem("email", email);
      // Redirect user to home page
      navigate("/");
      window.location.reload(); // Refresh the page
    } else {
      if (json.error && json.error.length > 0) {
        for (const error of json.error) {
          setShowerr(error.msg); // Show error messages
        }
      } else {
        setShowerr(json.error)
      }
    }
  };
  return (
    <section className="container" style={{marginTop: '10dvh'}}>
      <div className="grid">
        <h1>Sign Up</h1>
        <p>
          Already a member?{" "}
          <span>
            <Link to="/login" style={{color: '#2190ff'}}>
              Login
            </Link>
          </span>
        </p>

        <form method="POST" onSubmit={register}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="form-control"
              placeholder="Enter your name"
              aria-describedby="helpId"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="form-control"
              placeholder="Enter your phone number"
              aria-describedby="helpId"
              pattern="\d{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="form-control"
              placeholder="Enter your email"
              aria-describedby="helpId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="form-control"
              placeholder="Enter your password"
              aria-describedby="helpId"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

          <div className="btn-group">
            <button
              type="submit"
              className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
            >
              Submit
            </button>
            <button
              type="reset"
              className="btn btn-danger mb-2 waves-effect waves-light"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
