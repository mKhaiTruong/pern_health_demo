import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function HealthLogin({ fetchHealthChecks, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { gun } = useContext(UserContext);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://172.16.131.85:9000/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.status === 200) {
        const { id, host_name, email } = response.data.user;

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", id);
        localStorage.setItem("hostName", host_name);
        localStorage.setItem("email", email);

        setUser({ id, hostName: host_name, email });

        // Update Gun.js with the logged-in user data
        gun.get("users").get(id).put({ hostName: host_name, email });

        fetchHealthChecks();
        openNotificationWithIcon(
          "success",
          "Login Successful",
          "You have successfully logged in."
        );
        navigate("/health/add-health-check");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      openNotificationWithIcon(
        "error",
        "Login Failed",
        "Invalid email or password."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    openNotificationWithIcon(
      "error",
      "Login Failed",
      "Please check your input and try again."
    );
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 shadow p-3 mb-5 bg-body-tertiary rounded" style={{maxHeight: "700px", marginTop: "25px"}}>
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-12">
          <h2 className="text-center mb-4">Login</h2>
        </div>
        <div className="col-12">
          <Form
            name="basic"
            labelCol={{
              span: 3,
            }}
            style={{
              maxWidth: 800,
              margin: "0 auto",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 3,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 20 }}
              >
                Submit
              </Button>
              <a href="/auth/register">Register</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
