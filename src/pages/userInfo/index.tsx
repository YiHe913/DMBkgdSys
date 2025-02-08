import React, { useState, useEffect } from "react";
// import { Link, Outlet } from "umi";
import styles from "./index.less";
import { Button, message, Table, Space, Image, Form, Input, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import request from "@/utils/request";
import moPic from "@/assets/mo.jpg";
interface UserDataType {
  id: string;
  username: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  avatar: string;
}

const UserInformation: React.FC = () => {
  const [userData, setUserData] = useState([]);
  const [userTotal, setUserTotal] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    // axios.get("http://localhost:8081/user/selectAll").then(({ data }) => {
    //   console.log(data, "res");
    //   setUserData(data.data)
    // });
    selectData({});
    // request.get("user/selectAll").then((res) => {
    //   console.log(res, "res");
    //   setUserData(res.data);
    // });
  }, [pageNum, pageSize]);

  const columns: TableProps<UserDataType>["columns"] = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "账号",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <Image width={50} src={text ? text : moPic} />,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        if (text === "admin") {
          return <Tag color="magenta">主管理</Tag>;
        } else if (text === "sAdmin") {
          return <Tag color="volcano">管理员</Tag>;
        } else {
          return <Tag color="cyan">用户</Tag>;
        }
      },
    },
    // {
    //   title: "地址",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const selectData = (values: any) => {
    let data = {
      username: values.username || "",
      name: values.name || "",
      pageNum: pageNum,
      pageSize: pageSize,
    };

    request.get("/user/selectByPage", { params: data }).then((res: any) => {
      if (res.code === "200") {
        // console.log(res, "res");
        setUserTotal(res.data.total);
        setUserData(res.data.records);
      }
    });
  };

  const onFinish = (values: any) => {
    // console.log("Finish:", values);
    selectData(values);
  };

  const onReset = () => {
    form.resetFields();
    selectData({});
  };
  const onShowSizeChange = (current: any, pageSize: any) => {
    // console.log(current, pageSize);
    setPageNum(current);
    setPageSize(pageSize);
  };
  return (
    <div className={styles["userInfo"]}>
      <h1>用户信息</h1>
      <div>
        <div style={{ margin: "15px 0" }}>
          <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            onFinish={onFinish}
          >
            <Form.Item name="username">
              <Input placeholder="请输入需要查询的账号" />
            </Form.Item>
            <Form.Item name="name">
              <Input placeholder="请输入需要查询的名称" />
            </Form.Item>

            <Form.Item shouldUpdate>
              <Space>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div style={{ margin: "15px 0", textAlign: "left" }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginRight: "15px" }}
          >
            新增
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            批量删除
          </Button>
        </div>
        <Table<UserDataType>
          rowSelection={rowSelection}
          columns={columns}
          dataSource={userData}
          pagination={{
            onChange: onShowSizeChange,
            total: userTotal,
          }}
        />
      </div>
    </div>
  );
};

export default UserInformation;
