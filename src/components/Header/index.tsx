import { Link, Outlet } from "umi";
import React, { useState, useEffect } from "react";
import styles from "./index.less";
import { Breadcrumb, Button, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
} from "@ant-design/icons";
const Header = (props: any) => {
  const { menuChange, menuCollapsed } = props;
  const [collaps, setCollaps] = useState(menuCollapsed);
  //   useEffect(() => {
  //     console.log(menuCollapsed,'menuCollapsed');

  // }, [menuCollapsed]);

  const handleButtonClick = () => {
    setCollaps(!collaps);
    menuChange(!collaps);
  };
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
                title: "Home",
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
          <div>
            <Avatar icon={<UserOutlined />} />
          </div>
        </div>
      </div>
      <div className={styles["header-ghost"]} />
    </div>
  );
};

export default Header;
