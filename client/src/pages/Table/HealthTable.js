import React from "react";
import { Button, Table, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import EditHealth from "../../components/Buttons/EditHealth";
import axios from "axios";

const HealthTable = ({ healthChecks, fetchHealthChecks }) => {
  const handleOnDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/health/${id}`);
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
      width: "20%",
    },
    {
      title: "Memory Usage",
      dataIndex: "memoryUsage",
      key: "memoryUsage",
      width: "20%",
    },

    {
      title: "Edit",
      dataIndex: "edit",
      width: "10%",
      render: (text, record) => (
        <EditHealth
          hostName={record.hostName}
          fetchHealthChecks={fetchHealthChecks}
          email={record.email}
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
