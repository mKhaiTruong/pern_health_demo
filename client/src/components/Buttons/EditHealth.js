import { Button, Modal, Input } from "antd";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

export default function EditHealth({ hostName, id, fetchHealthChecks }) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [inputValue, setInputValue] = useState(hostName);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await fetch(`http://localhost:9000/metrics/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hostName: inputValue }),
      });

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
