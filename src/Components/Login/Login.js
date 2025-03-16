import "./Login.css";
import React from "react";

const Login = () => {
  return (
    <section class="container" style={{marginTop: '10dvh'}}>
      <div class="grid">
        <h1>Login</h1>
        <p>
          Are you a new member?
          <span>
            <a href="/Signup" style={{color: "#2190ff"}}>
              {" "}
              Sign Up Here{" "}
            </a>
          </span>
        </p>

        <form>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              class="form-control"
              placeholder="Enter your email"
              aria-describedby="helpId"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              name="password"
              id="password"
              required
              class="form-control"
              placeholder="Enter your password"
              aria-describedby="helpId"
            />
          </div>
          <div class="btn-group">
            <button
              type="submit"
              class="btn btn-primary mb-2 mr-1 waves-effect waves-light"
            >
              Submit
            </button>
            <button
              type="reset"
              class="btn btn-danger mb-2 waves-effect waves-light"
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
