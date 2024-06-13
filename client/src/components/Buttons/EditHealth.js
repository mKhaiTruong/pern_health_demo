import React, { useState, useContext } from "react";
import { Button, Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../../UserContext";

export default function EditHealth({ hostName, email, fetchHealthChecks }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValue, setInputValue] = useState(hostName);
  const { user, setUser } = useContext(UserContext);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await axios.put("http://172.16.131.85:9000/health/email", {
        hostName: inputValue,
        email: email,
      });

      localStorage.setItem("hostName", inputValue);
      setUser({ id: user.id, hostName: inputValue, email: user.email });
      console.log("Updated hostName in localStorage:", inputValue);
      fetchHealthChecks();
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="d-flex justify-content-center align-items-center"
      >
        <EditOutlined />
      </Button>
      <Modal
        title="Changing host name is the only thing available"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          size="large"
          placeholder="Update description"
          value={inputValue}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
}
