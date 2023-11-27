import React from "react";
import "./Header.css";
import logo from "../../Assets/logo2.png";
import DropDown from "../dropdown/DropDown";

function Header() {
  return (
    <div className="mainBar">
      <div className="logo_container">
        <img className="logo_img" src={logo} alt="Groupomania logo" />
      </div>

      <div className="profile_icon">
        <DropDown />
      </div>
    </div>
  );
}

export default Header;
