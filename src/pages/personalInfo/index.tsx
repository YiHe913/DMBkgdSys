import React, { useState, useEffect } from "react";
import { history } from "umi";
import { Button, Upload, Form, Input, InputNumber, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import styles from "./index.less";
import request from "@/utils/request";
import { baseURL } from "@/utils/baseUrl";

const PersonalInfo: React.FC = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}")
  );
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}")?.avatar
  );
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    // setUserData(JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}"));
    console.log(request, "request.baseURL");
  }, []);

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      message.error("Image must smaller than 20MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setLoading(false);
      console.log(info.file.response.data, "info");

      setImageUrl(info.file.response.data);
      //   getBase64(info.file.originFileObj as FileType, (url) => {
      //     setLoading(false);
      //     setImageUrl(url);
      //   });
    }
  };

  const onFinish = (values: any) => {
    let data = {
      ...userData,
      ...values,
      avatar: imageUrl,
    };

    console.log("Received values of form: ", data);
    request.put("/user/update", data).then((res: any) => {
      console.log(res, "res");

      if (res.code === "200") {
        messageApi.open({
          type: "success",
          content: "修改成功！",
        });
        localStorage.setItem("dmbkgdsys-user", JSON.stringify(data));
      } else {
        messageApi.open({
          type: "error",
          content: res.msg,
        });
      }
    });
  };

  return (
    <div className={styles["personalInfo"]}>
      <h1>个人信息</h1>
      <div>
        <div style={{ textAlign: "center" }}>
          <Upload
            name="file"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            action={`${baseURL}/file/upload`}
            headers={{
              authorization: "authorization-text",
              token: JSON.parse(localStorage.getItem("dmbkgdsys-user") || "{}")
                ?.token,
            }}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              <button style={{ border: 0, background: "none" }} type="button">
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </div>
        <Form
          form={form}
          name="personalInfo"
          style={{ maxWidth: 600, margin: "30px auto" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            initialValue={userData?.username}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "Please input!" }]}
            initialValue={userData?.name}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="电话"
            name="phone"
            rules={[{ required: true, message: "Please input!" }]}
            initialValue={userData?.phone}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
            initialValue={userData?.email}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="地址"
            name="address"
            initialValue={userData?.address}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
      {contextHolder}
    </div>
  );
};

export default PersonalInfo;
