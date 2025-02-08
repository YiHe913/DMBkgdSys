import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "umi";
import styles from "./index.less";
import { Button, message, Table, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { TableProps, UploadProps, UploadFile } from "antd";

const HomePage: React.FC = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [userPic, setUserPic] = useState("");
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}"));
  }, []);

  const getPeriodOfDay = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 6) {
      return "凌晨";
    } else if (hours >= 6 && hours < 12) {
      return "上午";
    } else if (hours === 12 && hours < 13) {
      return "中午";
    } else if (hours >= 13 && hours < 19) {
      return "下午";
    } else {
      return "晚上";
    }
  };


  return (
    <div className={styles["homePage"]}>
      <div className={styles["homePage-title"]}>
        {getPeriodOfDay()}好，{userData?.name}。祝您愉快每一天！
      </div>
      <div className={styles["homePage-content"]}>Yay! Welcome!!</div>
      {/* <div>
        <h1>Yay! Welcome!!</h1>
        <div>
          <span>渲染用户数据</span>
          <div>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>

            <Button icon={<UploadOutlined />} onClick={()=>{window.open(userPic)}}>下载</Button>
          </div>
          <div>
            <Table<UserDataType> columns={columns} dataSource={userData} />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
