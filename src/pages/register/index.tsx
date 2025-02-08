import React, { useState, useEffect } from "react";
import { history, Link } from "umi";
import styles from "./index.less";
import request from "@/utils/request";
import {
  LockOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";

const Register: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    request.post("/register", values).then((res: any) => {
      if (res.code === "200") {
        messageApi.open({
          type: "success",
          content: "注册成功！",
        });
        history.push("/login");
      } else {
        messageApi.open({
          type: "error",
          content: res.msg,
        });
      }
    });
  };

  return (
    <div className={styles["register-box"]}>
      <div className={styles["register-box-container"]}>
        <div className={styles["register-box-container-left"]}>
          <img src={require("@/assets/register.jpg")} alt="" />
        </div>
        <div className={styles["register-box-container-right"]}>
          <p>欢迎注册数据管理后台系统</p>
          <Form
            name="register"
            initialValues={{ remember: true }}
            style={{ maxWidth: 400 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入您的用户名!" }]}
              // initialValue={"admin"}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入您的用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入您的密码!" }]}
              hasFeedback
              // initialValue={"123456"}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入您的密码"
              />
            </Form.Item>
            <Form.Item
              name="confirmPass"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "请确认您的密码!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("您输入的新密码不匹配！"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<CheckCircleOutlined />}
                placeholder="请确认您的密码"
              />
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                注册
              </Button>
            </Form.Item>
            <div>
              已经有账号了？请<Link to="/login">登录</Link>
            </div>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default Register;
