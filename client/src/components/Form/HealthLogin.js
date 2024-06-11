import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function HealthLogin({ fetchHealthChecks, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:9000/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        const { id, host_name, email } = response.data.user;

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", id);
        localStorage.setItem("hostName", host_name);
        localStorage.setItem("email", email);

        setUser({ id, hostName: host_name, email });

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
    <div>
      <h2>Login</h2>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
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
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <a href="/auth/register">Register</a>
        </Form.Item>
      </Form>
    </div>
  );
}
