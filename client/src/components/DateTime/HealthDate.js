import React, { useState, useEffect } from "react";
import { Col, Row, Statistic, Calendar } from "antd";
import dayjs from "dayjs";

const HealthDate = () => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          title="Current Date"
          value={dayjs(currentDate).format("YYYY-MM-DD")}
        />
      </Col>
      <Col span={12}>
        <Statistic
          title="Current Time"
          value={currentDate.toLocaleTimeString()}
        />
      </Col>
      <Col span={24} style={{ marginTop: 32 }}>
        <Calendar fullscreen={false} />
      </Col>
    </Row>
  );
};

export default HealthDate;
