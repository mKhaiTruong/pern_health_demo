import React from "react";
import { Column } from "@ant-design/charts";
import { theme } from "antd";
import HealthTable from "./HealthTable";
import { Row, Col } from "antd";

const HealthViewTable = ({ healthChecks, fetchHealthChecks }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const createTransformedData = (type) => {
    return healthChecks.map((item) => ({
      type,
      email: item.email,
      usage: type === "CPU Usage" ? item.cpuUsage : item.memoryUsage,
    }));
  };

  const createConfig = (data, color, title) => {
    return {
      data,
      xField: "email",
      yField: "usage",
      style: {
        fill: color,
      },
      title: {
        visible: true,
        text: title,
      },
      height: 350,
    };
  };

  const transformedDataCPU = createTransformedData("CPU Usage");
  const transformedDataMemory = createTransformedData("Memory Usage");

  const configCPU = createConfig(
    transformedDataCPU,
    "rgba(126, 212, 236, 0.8)",
    "CPU Usage"
  );
  const configMemory = createConfig(
    transformedDataMemory,
    "rgba(621, 105, 180, 0.8)",
    "Memory Usage"
  );

  return (
    <div
      className="container"
      style={{
        padding: 0,
        marginTop: 25,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Row justify="space-around">
        <Col span={8}>
          <Column {...configCPU} />
        </Col>
        <Col span={8}>
          <Column {...configMemory} />
        </Col>
      </Row>

      <HealthTable
        healthChecks={healthChecks}
        fetchHealthChecks={fetchHealthChecks}
      />
    </div>
  );
};

export default HealthViewTable;
