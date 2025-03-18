import React, { useState } from "react";
import { Link } from "react-router";

import "./ProfileCard.css";

const ProfileCard = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleShowProfile = (e) => {
    setShow(!show);
  };
  return (
    <div class="profile-options">
      <div onClick={handleShowProfile}>{children}</div>
      {show ? (
        <div className={show ? "profile-dropdown active" : "profile-dropdown"}>
          <Link to="/edit-profile">Your Profile</Link>
          <Link to="/reports">Your Reports</Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCard;
