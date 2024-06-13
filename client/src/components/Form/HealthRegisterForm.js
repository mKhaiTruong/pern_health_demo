import React, { useContext } from "react";
import { Button, Form, Input, Space, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
  size: "large",
};

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

export default function HealthRegisterForm({ fetchHealthChecks }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { gun } = useContext(UserContext);

  const onFinish = async (values) => {
    const { hostName, email, password, password2 } = values;
    if (password !== password2) {
      form.setFields([
        {
          name: "password2",
          errors: ["Passwords do not match!"],
        },
      ]);
      return;
    }
    try {
      const response = await axios.post(
        "http://172.16.131.85:9000/auth/register",
        {
          hostName,
          email,
          password,
          password2,
        }
      );
      console.log("Server response:", response);
      form.resetFields();
      fetchHealthChecks();

      // Add new user to Gun.js
      gun.get("users").set({ hostName, email });

      navigate("/auth/login");
    } catch (error) {
      console.error("Error registering:", error);
      notification.error({
        message: "Registration Failed",
        description:
          error.response?.data?.message ||
          "An error occurred during registration.",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Registration Failed",
      description: "Please check your input and try again.",
    });
  };

  const onReset = () => form.resetFields();

  const onFill = () => {
    form.setFieldsValue({
      hostName: "Default PC",
      email: "test@example.com",
      password: "password",
      password2: "password",
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 shadow p-3 mb-5 bg-body-tertiary rounded" style={{maxHeight: "700px", marginTop: "25px"}}>
      <div className="row justify-content-center align-items-center w-100">
        <div className="col-12">
          <h2 className="text-center mb-4">Register Form</h2>
        </div>
        <div className="col-12">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginBottom: 50 }}
          >
            <Form.Item
              name="hostName"
              label="Host name"
              rules={[
                {
                  required: true,
                  message: "Please input your PC name!",
                },
              ]}
              style={{ maxWidth: "98%" }}
            >
              <Input placeholder="Add host name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
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
              style={{ maxWidth: "98%" }}
            >
              <Input placeholder="Add email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={{ maxWidth: "98%" }}
            >
              <Input.Password placeholder="Add password" />
            </Form.Item>

            <Form.Item
              name="password2"
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Confirm your password!",
                },
              ]}
              style={{ maxWidth: "98%" }}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  Fill form
                </Button>
              </Space>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <a href="/auth/login">Already has an account?</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
