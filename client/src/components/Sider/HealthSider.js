import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function HealthSider({ collapsed, onCollapse, items }) {
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
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
  );
}
