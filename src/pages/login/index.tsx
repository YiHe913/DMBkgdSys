import React, { useState, useEffect } from "react";
import { history, Outlet } from "umi";
import styles from "./index.less";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";

const onFinish = (values: any) => {
  console.log("Received values of form: ", values);
  if (values?.username === "admin" && values?.password === "123456") {
    sessionStorage.setItem(`usename`, "admin");
    sessionStorage.setItem(`token`, "asdfgh1234123asqewqwew");
    history.push("/");
  }
};

const Login: React.FC = () => {
  return (
    <div className={styles["login-box-container"]}>
      <div className={styles["login-container"]}>
        <h2>数据管理后台系统</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入你的用户名!" }]}
            initialValue={"admin"}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入你的密码!" }]}
            initialValue={"123456"}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="">忘记密码</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
            {/* 或者 <a href="">立即注册</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
