import React from "react";
import { theme } from "antd";
import HealthCard from "../../components/Card/HealthCard";
import HealthDate from "../../components/DateTime/HealthDate";

export default function HealthInformation({ user, fetchHealthChecks }) {
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
          <h3>Your information</h3>
        </div>
      </div>

      <div className="row justify-content-around">
        <div className="col-4 text-center mb-5">
          <HealthCard user={user} />
        </div>
        <div className="col-6 mb-5">
          <HealthDate />
        </div>
      </div>
    </div>
  );
}
