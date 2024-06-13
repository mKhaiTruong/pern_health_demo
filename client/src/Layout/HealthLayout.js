import React, { useEffect, useState, useContext } from "react";
import {
  BorderlessTableOutlined,
  FileOutlined,
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";

import HealthViewTable from "../pages/Table/HealthViewTable";
import HealthInformation from "../pages/Information/HealthInformation";
import HealthSider from "../components/Sider/HealthSider";
import StruggleDoc from "../components/Doc/StruggleDoc";
import { UserContext } from "../UserContext";
import axios from "axios";

const { Content, Footer } = Layout;

function getItem(label, key, icon, path, children = []) {
  return { key, icon, path, children, label };
}

const items = [
  getItem("Adding Health Check", "1", <UserAddOutlined />, "/add-health-check"),
  getItem("View Table", "2", <BorderlessTableOutlined />, "/view-table"),
  getItem("User", "sub1", <UserOutlined />, "/users", [
    getItem("Tom", "3", null, "/users/tom"),
    getItem("Bill", "4", null, "/users/bill"),
    getItem("Alex", "5", null, "/users/alex"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, "/teams", [
    getItem("Team 1", "6", null, "/teams/team1"),
    getItem("Team 2", "8", null, "/teams/team2"),
  ]),
  getItem("Files", "9", <FileOutlined />, "/files"),
];

const HealthLayout = ({ healthChecks, fetchHealthChecks }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, gun } = useContext(UserContext);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await axios.post("http://172.16.131.85:9000/health/addNew", {
          hostName: user.hostName,
          email: user.email,
        });
        console.log("Successfully added");
        fetchHealthChecks();
      } catch (error) {
        console.error("Error fetching health checks:", error);
      }
    }, 10000); 

    const healthChecksRef = gun.get("healthChecks");
    healthChecksRef.on((data) => {
      if (data && data.healthChecks) {
        fetchHealthChecks(data.healthChecks);
      }
    });

    return () => {
      clearInterval(intervalId); // Cleanup interval on unmount
      healthChecksRef.off(); // Unsubscribe from Gun.js updates
    };
  }, [fetchHealthChecks, gun, user.hostName, user.email]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HealthSider
        collapsed={collapsed}
        onCollapse={setCollapsed}
        items={items}
      />

      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route
              path="/add-health-check"
              element={
                <HealthInformation
                  fetchHealthChecks={fetchHealthChecks}
                />
              }
            />

            {/* Routes to menuItem: View table */}
            <Route
              path="/view-table"
              element={
                <HealthViewTable
                  healthChecks={healthChecks}
                  fetchHealthChecks={fetchHealthChecks}
                />
              }
            />

            {/* Routes to menuItem: Users */}

            {/* Routes to menuItem: Files */}
            <Route path="/files" element={<StruggleDoc />} />
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Notice me now?
        </Footer>
      </Layout>
    </Layout>
  );
};
export default HealthLayout;
