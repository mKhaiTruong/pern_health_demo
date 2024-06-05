import React from "react";
import { theme } from "antd";
import HealthForm from "./HealthForm";
import HealthTable from "./HealthTable";

export default function HealthInput({ healthChecks, fetchHealthChecks }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <div className="row">
        <div className="col-12 text-center mb-5">
          <h3>Input new Node Health Status</h3>
        </div>

        <HealthForm fetchHealthChecks={fetchHealthChecks}/>

        <HealthTable healthChecks={healthChecks} fetchHealthChecks={fetchHealthChecks} />
      </div>
    </div>
  );
}
