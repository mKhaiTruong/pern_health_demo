import React, { useContext } from "react";
import { Button, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditHealth from "../../components/Buttons/EditHealth";
import { UserContext } from "../../UserContext";
import axios from "axios";

const HealthTable = ({ healthChecks, fetchHealthChecks }) => {
  const { gun } = useContext(UserContext);

  const handleOnDelete = async (id) => {
    try {
      // Delete from health database
      await axios.delete(`http://172.16.131.85:9000/health/${id}`);

      // Delete from Gun.js database
      const healthChecksRef = gun.get("healthChecks");
      healthChecksRef.get(id).put(null);

      fetchHealthChecks();
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusTag = (status) => {
    if (status === "Healthy") {
      return <Tag color="green">Healthy</Tag>;
    } else if (status === "Unhealthy") {
      return <Tag color="volcano">Unhealthy</Tag>;
    } else {
      return <Tag color="default">{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "Host Name",
      width: "30%",
      dataIndex: "hostName",
      key: "hostName",
    },
    {
      title: "Email",
      width: "30%",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "15%",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Time Stamp",
      dataIndex: "timestamp",
      key: "timestamp",
      width: "30%",
    },
    {
      title: "Response Time",
      dataIndex: "responseTime",
      key: "responseTime",
      width: "30%",
    },
    {
      title: "CPU Usage",
      dataIndex: "cpuUsage",
      key: "cpuUsage",
      width: "16%",
      align: "center",
    },
    {
      title: "Memory Usage",
      dataIndex: "memoryUsage",
      key: "memoryUsage",
      width: "20%",
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      width: "10%",
      render: (text, record) => (
        <EditHealth
          hostName={record.hostName}
          email={record.email}
          fetchHealthChecks={fetchHealthChecks}
        />
      ),
      fixed: "right",
      align: "center",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "10%",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => handleOnDelete(record.key)}
          className="d-flex justify-content-center align-items-center"
        >
          <DeleteOutlined />
        </Button>
      ),
      fixed: "right",
      align: "center",
    },
  ];

  return (
    <Table columns={columns} dataSource={healthChecks} scroll={{ y: 200 }} />
  );
};

export default HealthTable;
