import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "umi";
import styles from "./index.less";

const DataManagement: React.FC = () => {
  return (
    <div className={styles["dataManagement"]}>
      <div>
        <h1>Yay! dataManagement!!</h1>
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

export default DataManagement;
