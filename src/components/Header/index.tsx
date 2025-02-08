import { Link, history } from "umi";
import React, { useState, useEffect } from "react";
import styles from "./index.less";
import { Breadcrumb, Button, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";

const Header = (props: any) => {
  const { menuChange, menuCollapsed } = props;
  const [collaps, setCollaps] = useState(menuCollapsed);
  const [userData, setUserData] = useState({ name: "", avatar: "" });
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}"));
  }, []);

  const loginOut = () => {
    localStorage.removeItem("dmbkgdsys-user");
    history.push("/login");
  };

  const handleButtonClick = () => {
    setCollaps(!collaps);
    menuChange(!collaps);
  };

  const items: MenuProps["items"] = [
    {
      label: <Link to="/personalInfo">个人信息</Link>,
      key: "0",
    },
    {
      label: <Link to="/login">修改密码</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <span onClick={loginOut}>退出登录</span>,
      key: "3",
    },
  ];
  return (
    <div className={styles["header"]}>
      <div
        className={styles["header-content"]}
        style={
          collaps
            ? { width: "calc(100% - 80px)" }
            : { width: "calc(100% - 200px)" }
        }
      >
        <div className={styles["header-content-left"]}>
          <Button
            type="link"
            onClick={handleButtonClick}
            style={{ color: "#333", fontSize: 20 }}
          >
            {collaps ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "首页",
              },
              {
                title: "Application Center",
                href: "",
              },
              {
                title: "Application List",
                href: "",
              },
              {
                title: "An Application",
              },
            ]}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Button type="link" style={{ color: "#333", fontSize: 20 }}>
              <BellOutlined />
            </Button>
          </div>
          <div style={{ paddingRight: "15px" }}>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <div style={{ cursor: "pointer" }}>
                <Avatar src={userData?.avatar} />
                <span style={{ marginLeft: "5px", color: "#333" }}>
                  {userData?.name}
                </span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className={styles["header-ghost"]} />
    </div>
  );
};

export default Header;
