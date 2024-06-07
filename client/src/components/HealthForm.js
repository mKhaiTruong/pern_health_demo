import React, { useState } from "react";
import { Button, Form, Input, Space } from "antd";
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

export default function HealthForm({ fetchHealthChecks }) {
  const [form] = Form.useForm();
  const [hostName, setHostName] = useState("Default PC");

  const onFinish = async () => {
    try {
      await fetch("http://localhost:9000/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostName }),
      });

      setHostName("");
      form.resetFields();
      fetchHealthChecks();
    } catch (error) {
      console.error(error);
    }
  };
  const onReset = () => form.resetFields();
  const onFill = () => {
    form.setFieldsValue({
      host_name: "Default PC",
    });
    setHostName("Default PC");
  };
  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ marginBottom: 50 }}
    >
      <Form.Item
        name="host_name"
        label="Host name"
        rules={[
          {
            required: true,
            message: "Please input your PC name!",
          },
        ]}
        style={{ maxWidth: "98%" }}
      >
        <Input
          placeholder="Add host name"
          value={hostName}
          onChange={(e) => setHostName(e.target.value)}
        />
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
    </Form>
  );
}
