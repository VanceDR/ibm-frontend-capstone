import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css";

const Login = () => {
    // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  // Get navigation function from react-router-dom
  const navigate = useNavigate();
  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);
  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };
  return (
    <section className="container" style={{marginTop: '10dvh'}}>
      <div className="grid">
        <h1>Login</h1>
        <p>
          Are you a new member?
          <span>
            <Link to="/Signup" style={{color: "#2190ff"}}>
              Sign Up Here
            </Link>
          </span>
        </p>

        <form onSubmit={login}>
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
          <div>
            <a href="#">Forgot Password?</a>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
