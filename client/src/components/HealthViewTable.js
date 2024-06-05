import React from "react";
import { Line } from "@ant-design/charts";
import { theme } from "antd";

const HealthViewTable = ({ summaryData }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const config = {
    data: summaryData,
    xField: (d) => new Date(d.timestamp),
    yField: 'cpuUsage',
    sizeField: 'cpuUsage',
    shapeField: 'trail',
    legend: { size: false },
    colorField: 'hostName',
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    point: {
      size: 4, // Increase point size for single host name data
    },
  };

  return (
    <div
      className="container"
      style={{
        padding: 25,
        marginTop: 25,
        minHeight: "100%",
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <Line {...config} />
    </div>
  );
};

export default HealthViewTable;
