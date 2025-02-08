import React from "react";
import { history } from "umi";
import { Button, Result } from "antd";

const backHome = () => {
  history.push("/");
};

const NotFind: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary" onClick={backHome}>
        Back Home
      </Button>
    }
  />
);

export default NotFind;
