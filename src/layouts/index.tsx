import React, { useState, useEffect } from "react";
import { history, Outlet } from "umi";
import "@/global.less";
import styles from "./index.less";
import {
  AppstoreOutlined,
  ContainerOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Logo from "@/components/Logo";
import Header from "@/components/Header";
const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  { key: "/", icon: <HomeOutlined />, label: "系统首页" },
  { key: "dataManagement", icon: <PieChartOutlined />, label: "数据管理" },
  { key: "logManagement", icon: <ContainerOutlined />, label: "日志管理" },
  {
    key: "sub1",
    label: "信息管理",
    icon: <AppstoreOutlined />,
    children: [
      { key: "userInformation", label: "用户信息" },
      { key: "adminInformation", label: "管理员信息" },
      { key: "permissionManagement", label: "权限管理" },
      { key: "roleAssignment", label: "角色分配" },
    ],
  },
  // {
  //   key: "sub2",
  //   label: "Navigation Two",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: "9", label: "Option 9" },
  //     { key: "10", label: "Option 10" },
  //     {
  //       key: "sub3",
  //       label: "Submenu",
  //       children: [
  //         { key: "11", label: "Option 11" },
  //         { key: "12", label: "Option 12" },
  //       ],
  //     },
  //   ],
  // },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  // useEffect(() => {
  //    setCollapsed(!collapsed);
  // }, []);
  const toggleCollapsed = (collaps: boolean) => {
    console.log(collaps, "collaps");

    setMenuCollapsed(collaps);
  };

  const changeMenu = ({ key }: { key: string }) => {
    console.log(key, "item, key, keyPath, domEvent");
    history.push(key);
  };

  return (
    <Layout hasSider className={styles["layout"]}>
      <Sider
        className={
          menuCollapsed
            ? styles["layout-hiddenSider"]
            : styles["layout-showSider"]
        }
      >
        <Logo menuCollapsed={menuCollapsed} />
        <Menu
          mode="inline"
          defaultSelectedKeys={["/"]}
          items={items}
          inlineCollapsed={menuCollapsed}
          theme="dark"
          onClick={changeMenu}
        />
      </Sider>
      <Layout
        style={
          menuCollapsed ? { marginInlineStart: 80 } : { marginInlineStart: 200 }
        }
      >
        <Header menuChange={toggleCollapsed} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
