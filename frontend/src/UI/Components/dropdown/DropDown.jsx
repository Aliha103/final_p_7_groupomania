import React from "react";
import {
  UserOutlined,
  PoweroffOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Dropdown, Button, Menu, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const user = {
    firstname: localStorage.getItem("firstname"),
    Id: localStorage.getItem("userId"),
    lastname: localStorage.getItem("lastname"),
    email: localStorage.getItem("email"),
  };

  const showDeleteConfirmation = () => {
    Modal.confirm({
      title: "Delete Account",
      content:
        "Are you sure you want to delete your account? This action cannot be undone.",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDeleteConfirmation,
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === "5") {
      // Clear the user context and navigate to the login page
      localStorage.clear();
      navigate("/login", { replace: true });
    } else if (e.key === "6") {
      showDeleteConfirmation();
    }
  };

  const handleDeleteConfirmation = () => {
    // Send DELETE request to server
    console.log(user);
    fetch(`http://localhost:8000/users/${user.Id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "deleted") {
          // Clear the user context and navigate to the login page
          localStorage.clear();
          navigate("/login", { replace: true });
        } else {
          // Handle unexpected response
          console.error("Unexpected response:", data);
        }
      })
      .catch((error) => {
        // Log the detailed error
        console.error("Error during deletion:", error);
      });
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
    {
      label: "Delete Account",
      key: "6",
      icon: <PoweroffOutlined className="custom-icon" />,
      danger: true,
    },
  ];

  return (
    <>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                danger={item.danger}
                onClick={item.onClick}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
        placement="bottom"
      >
        <Button
          icon={<UserOutlined className="custom-icon" />}
          className="circle-button"
        />
      </Dropdown>
    </>
  );
};

export default App;
