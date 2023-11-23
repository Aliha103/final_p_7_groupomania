import React from "react";
import "./Header.css";
import { Search, Email, Notifications, Person } from "@mui/icons-material";
import logo from "../../Assets/logo2.png";
import DropDown from "../dropdown/DropDown";

function Header() {
  return (
    <div className="mainBar">
      <div className="logo_container">
        <img className="logo_img" src={logo} alt="Groupomania logo" />
      </div>
      <div className="header_searchBar">
        <Search className="header_searchIcon" />
        <input
          type="text"
          className="header_searchInput"
          placeholder="Search for friends or posts."
        />
      </div>
      <div className="rightSideMenu">
        <Notifications />
        <Email />
        <Person />
        <div className="profile_icon">
          <DropDown />
        </div>
      </div>
    </div>
  );
}

export default Header;
