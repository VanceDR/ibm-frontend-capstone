import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/LandingPage/LandingPage";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      {/* Set up BrowserRouter for routing */}
      <BrowserRouter>
        {/* Display the Navbar component */}
        <Navbar />
        {/* Set up the Routes for different pages */}
        <Routes>
          {/* Define individual Route components for different pages */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
