import React, { useState } from "react";
import {
  BorderlessTableOutlined,
  FileOutlined,
  UserAddOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Routes, Route, Link } from "react-router-dom";

import HealthViewTable from "./HealthViewTable";
import HealthInput from "./HealthInput";

const { Content, Footer, Sider } = Layout;

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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width="220"
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ marginTop: "25px" }}
        >
          {items.map((item) => {
            if (item.children && item.children.length > 0)
              return (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                  items={item.children}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>
                      <Link to={child.path}>{child.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            else
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.label}</Link>
                </Menu.Item>
              );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}

          {/* Define routes for different components */}
          <Routes>
            {/* Routes to menuItem: Add health check */}
            <Route
              path="/add-health-check"
              element={
                <HealthInput
                  healthChecks={healthChecks}
                  fetchHealthChecks={fetchHealthChecks}
                />
              }
            />

            {/* Routes to menuItem: View table */}
            <Route path="/view-table" element={<HealthViewTable summaryData={healthChecks}/>} />

            {/* Routes to menuItem: Users */}

            {/* Routes to menuItem: Files */}
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
