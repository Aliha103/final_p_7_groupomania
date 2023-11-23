import React from "react";
import { UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { Dropdown, Button } from "antd";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const user = {
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    email: localStorage.getItem("userEmail"),
  };

  const handleMenuClick = (e) => {
    if (e.key === "5") {
      // Clear the user context and navigate to the login page
      localStorage.removeItem("isLoggedIn");
      navigate("/login");
    }
    if (e.key === "3") {
      navigate("/userprofile");
    }
  };

  const items = [
    {
      label: user ? `${user.firstname} ${user.lastname}` : "Loading...",
      key: "1",
      icon: <UserOutlined className="custom-icon" />,
    },
    {
      label: user ? user.email : "Loading...",
      key: "2",
      icon: <UserOutlined className="custom-icon" />,
    },
    {
      label: "Profile",
      key: "3",
      icon: <UserOutlined className="custom-icon" />,
    },
    {
      label: "Sign Out",
      key: "5",
      icon: <PoweroffOutlined className="custom-icon" />,
      danger: true,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottom">
        <Button
          icon={<UserOutlined className="custom-icon" />}
          className="circle-button"
        ></Button>
      </Dropdown>
    </>
  );
};

export default App;
