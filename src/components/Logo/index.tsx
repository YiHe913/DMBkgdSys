import { Link, Outlet } from "umi";
import styles from "./index.less";
import logoPic from "@/assets/logo.png";
import React, { useState, useEffect } from "react";

const Logo = (props: any) => {
  const { menuCollapsed } = props;
  return (
    <Link to="/" className={styles["logo"]}>
      <img src={logoPic} alt="logo" />
      {!menuCollapsed ? <span>数据管理后台系统</span> : null}
    </Link>
  );
};

export default Logo;
