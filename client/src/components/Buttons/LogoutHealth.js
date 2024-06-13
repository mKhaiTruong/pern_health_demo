import React from "react";
import { Button, notification, message, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutHealth = () => {
  const navigate = useNavigate();

  const confirm = (e) => {
    handleLogout();
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://172.16.131.85:9000/auth/logout");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userId");
      localStorage.removeItem("hostName");
      localStorage.removeItem("email");

      notification.success({
        message: "Logout Successful",
        description: "You have been logged out successfully.",
      });

      navigate("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
      notification.error({
        message: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <Popconfirm
      title="Log out"
      description="Are you sure to log out?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary" danger>
        Log Out
      </Button>
    </Popconfirm>
  );
};

export default LogoutHealth;
