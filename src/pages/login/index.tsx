import React, { useState, useEffect } from "react";
import { history, Link } from "umi";
import styles from "./index.less";
import request from "@/utils/request";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  console.log(process.env.API_URL,'console.log(process.env.API_URL);');
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    request.post("/login", values).then((res: any) => {
      if (res.code === "200") {
        history.push("/");
        messageApi.open({
          type: "success",
          content: "登录成功！",
        });
        localStorage.setItem("dmbkgdsys-user",JSON.stringify(res.data))
      } else {
        messageApi.open({
          type: "error",
          content: res.msg,
        });
      }
    });
  };

  return (
    <div className={styles["login-box"]}>
      <div className={styles["login-box-container"]}>
        <div className={styles["login-box-container-left"]}>
          <img src={require("@/assets/login.jpg")} alt="" />
        </div>
        <div className={styles["login-box-container-right"]}>
          <p>数据管理后台系统</p>
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入你的用户名!" }]}
              // initialValue={"admin"}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入你的用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入你的密码!" }]}
              // initialValue={"123456"}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入你的密码"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
            <div className={styles["login-box-container-right-link"]}>
              <div>
                还没有账号？请<Link to="/register">注册</Link>

              </div>
              <div>
                <a href="">忘记密码</a>
              </div>
            </div>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Login;
