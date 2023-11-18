import React from "react";
import "./Header.css";
import { Search, Email, Notifications, Person } from "@mui/icons-material";
import logo from "../../Assets/logo2.png";

function Header() {
  return (
    <div className="mainBar">
      <div className="logo_container">
        <img className="logo_img" src={logo} alt="Groupomania logo" />
      </div>
      <div className="searchBar">
        <Search className="searchIcon" />
        <input
          type="text"
          className="searchInput"
          placeholder="Search for friends or posts."
        />
      </div>
      <div className="rightSideMenu">
        <Notifications />
        <Email />
        <Person />
      </div>
    </div>
  );
}

export default Header;
