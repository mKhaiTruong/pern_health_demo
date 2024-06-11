import React, { useEffect, useState } from "react";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Card, Modal, Input, Typography } from "antd";
import LogoutHealth from "../Buttons/LogoutHealth";

const { Meta } = Card;

const HealthCard = ({ user }) => {
  const { id, hostName, email } = user;
  const [description, setDescription] = useState("You have not added anything");
  const [inputValue, setInputValue] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [coverSrc, setCoverSrc] = useState("");
  const [avatarSrc, setAvatarSrc] = useState("");

  useEffect(() => {
    setCoverSrc(`https://picsum.photos/id/${id}/300/175?`);
    setAvatarSrc(`https://api.dicebear.com/7.x/miniavs/svg?seed=${id}`);
  }, [id]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    setDescription(inputValue);
    setOpen(false);
    setConfirmLoading(false);
  };

  return (
    <>
      <Card
        style={{ width: 360 }}
        cover={<img alt="example" src={coverSrc} />}
        actions={[
          <EditOutlined key="edit" onClick={showModal} />,
          <EllipsisOutlined key="ellipsis" />,
          <LogoutHealth />,
        ]}
      >
        <Meta
          avatar={<Avatar src={avatarSrc} />}
          title="User Info"
          description={
            <div style={{ textAlign: "left" }}>
              <Typography.Text strong>Host name:</Typography.Text> {hostName}
              <div style={{ display: "flex", gap: "10px" }}>
                <Typography.Text underline>Email:</Typography.Text>
                <p>{email}</p>
              </div>
              <Typography.Paragraph editable={{ onChange: setDescription }}>
                {description}
              </Typography.Paragraph>
            </div>
          }
          style={{ textAlign: "left" }}
        />
      </Card>
      <Modal
        title="Changing Description"
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
};

export default HealthCard;
