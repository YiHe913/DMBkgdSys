import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "umi";
import styles from "./index.less";

const LogManagement: React.FC = () => {
  return (
    <div className={styles["logManagement"]}>
      <div>
        <h1>Yay! logManagement!!</h1>
        {/* {
          // indicates very long content
          Array.from({ length: 100 }, (_, index) => (
            <React.Fragment key={index}>
              {index % 20 === 0 && index ? "more" : "..."}
              <br />
            </React.Fragment>
          ))
        } */}
      </div>
    </div>
  );
};

export default LogManagement;
